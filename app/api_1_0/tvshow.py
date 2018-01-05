# coding:utf-8
from flask import json, jsonify, request
from flask import session

from app import redis_store, db
from app.response_code import RET
from app.models import TvShow, TvShowNum, TvShowComment
from . import api
from flask_restful import Resource, Api
import logging

api = Api(api)

class TvShowList(Resource):
    def get(self):
        """
            1. 访问redis获取缓存
            2. 没有缓存, 查询MySQL
            3. 需要对数据转JSON
            4. 保存redis中
            5. 如果有缓存, 返回缓存数据
            6. 返回给浏览器
        """

        type = request.args.get("type", "0")
        page = request.args.get("page", "1")
        size = request.args.get("size", "10")

        redis_key = 'tvshow_list_' + type + "_" + page + "_" + size

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            tv_json = redis_store.hget(redis_key, "tv_json")
            total_page = redis_store.hget(redis_key, "total_page")
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None
            tv_json = None

        # 2. 没有缓存, 查询MySQL
        if not tv_json:
            # 查询MySQL所有的数据
            try:
                # 分类 排序
                if type == "1":
                    tv_query = TvShow.query.filter_by(type=1).order_by(TvShow.create_time.desc())
                elif type == "2":
                    tv_query = TvShow.query.filter_by(type=2).order_by(TvShow.create_time.desc())
                elif type == "3":
                    tv_query = TvShow.query.filter_by(type=3).order_by(TvShow.create_time.desc())
                else:
                    tv_query = TvShow.query.order_by(TvShow.create_time.desc())
            # 分页
                                              # 页数 每页数量 错误输出
                tv_page = tv_query.paginate(int(page), int(size), False)
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库异常")

            # 将数据转为JSON
            tv_list = tv_page.items  # 当前页中的数据结果
            total_page = tv_page.pages  # 总页数

            # 3. 需要对数据转JSON
            tvs = []
            for tv in tv_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                tvs.append(tv.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            tv_json = json.dumps(tvs)

            # 4. 保存redis中
            try:
                # 使用redis中的事务
                pipeline = redis_store.pipeline()
                # 开启事务
                pipeline.multi()
                map_temp = {"tv_json":tv_json, "total_page":total_page}
                pipeline.hmset(redis_key, map_temp)
                # pipeline.hset(redis_key, tv_json, tv_json)
                pipeline.expire(redis_key, 300)
                # 执行事务
                pipeline.execute()
            except Exception as e:
                logging.error(e)

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=0, errmsg="查询电视剧成功", tvs=json.loads(tv_json), total_page=total_page, page=page)

api.add_resource(TvShowList, '/tvshow_list')

class TvShowDetail(Resource):
    def get(self):
        id = request.args.get("id")
        num = request.args.get("num", 1)

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            tv_json = redis_store.get('tvshow_' + id)
        except Exception as e:
            logging.error(e)
            tv_json = None

        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            tv_url = redis_store.get('tvshow_url_' + id + "_" + num)
        except Exception as e:
            logging.error(e)
            tv_url = None

        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            tv_nums_json = redis_store.get('tvshow_nums_' + id)
        except Exception as e:
            logging.error(e)
            tv_nums_json = None

        # 2. 没有缓存, 查询MySQL
        if not tv_json:
            # 查询MySQL所有的数据
            try:
                tv = TvShow.query.filter_by(id=id).first()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not tv:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            # 3. 需要对数据转JSON
            tv_dict = tv.to_dict()

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            tv_json = json.dumps(tv_dict)

            # 4. 保存redis中
            try:
                redis_store.setex('tvshow_' + id, 300, tv_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        if not tv_url:
            # 查询MySQL所有的数据
            try:
                tv = TvShowNum.query.filter_by(tv_id=id, num=num).first()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not tv:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            tv_url = tv.get_real_url()

            # 4. 保存redis中
            try:
                redis_store.setex('tvshow_url_' + id + "_" + num, 300, tv_url)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()

        if not tv_nums_json:
            # 查询MySQL所有的数据
            try:
                tv_nums = TvShowNum.query.filter_by(tv_id=id).order_by(TvShowNum.num.asc()).all()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not tv_nums:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            tv_num_list = []
            for tv_num in tv_nums:
                tv_num_list.append(tv_num.num)

            tv_nums_json = json.dumps(tv_num_list)

            # 4. 保存redis中
            try:
                redis_store.setex('tvshow_num_' + id , 300, tv_nums_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询电视剧成功", tv=json.loads(tv_json), tv_url=tv_url, tv_nums=json.loads(tv_nums_json), tv_num=str(num))

api.add_resource(TvShowDetail, '/tvshow')

class TvShowComments(Resource):
    def get(self):
        id = request.args.get("id")

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            comments_json = redis_store.get('tvshow_comment_' + id)
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not comments_json:
            # 查询MySQL所有的数据
            comments_list = TvShowComment.query.filter_by(tv_show_id=id).all()

            # 3. 需要对数据转JSON
            comments = []
            for comment in comments_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                comments.append(comment.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            comments_json = json.dumps(comments)

            # 4. 保存redis中
            try:
                redis_store.setex('tvshow_comment_' + id, 300, comments_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询电视剧评论成功", comments=json.loads(comments_json))

    def post(self):
        username = session.get("username")
        tvshow_id = request.form.get("id")
        comment = request.form.get("comment")

        if not username:
            return jsonify(errno=RET.NODATA, errmsg="请先登陆")

        if not all([tvshow_id, comment]):
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 查询MySQL所有的数据
        tvshow_comment = TvShowComment(user_name=username, comment=comment, tv_show_id=tvshow_id)

        try:
            db.session.add(tvshow_comment)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logging.error(e)
            resp_dict = {
                'errno': RET.SERVERERR,
                'errmsg': '评论失败'
            }
            return jsonify(resp_dict)

        # 删除redis评论
        try:
            redis_store.delete('tvshow_comment_' + tvshow_id)
        except Exception as e:
            logging.error(e)

        # 二. 返回数据
        resp_dict = {
            'errno': RET.OK,
            'errmsg': '评论成功'
        }
        return jsonify(resp_dict)

api.add_resource(TvShowComments, '/tvshow_comments')


