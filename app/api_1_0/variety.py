# coding:utf-8
from flask import json, jsonify, request
from flask import session

from app import redis_store, db
from app.response_code import RET
from app.models import Variety, VarietyNum, TvShowComment, VarietyComment
from . import api
from flask_restful import Resource, Api
import logging

api = Api(api)

class VarietyList(Resource):
    def get(self):
        """
            1. 访问redis获取缓存
            2. 没有缓存, 查询MySQL
            3. 需要对数据转JSON
            4. 保存redis中
            5. 如果有缓存, 返回缓存数据
            6. 返回给浏览器
        """

        page = request.args.get("page", "1")
        size = request.args.get("size", "10")

        redis_key = 'variety_list_' + page + "_" + size

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            variety_json = redis_store.hget(redis_key, "variety_json")
            total_page = redis_store.hget(redis_key, "total_page")
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None
            variety_json = None

        # 2. 没有缓存, 查询MySQL
        if not variety_json:
            # 查询MySQL所有的数据
            try:
                variety_query = Variety.query.order_by(Variety.create_time.desc())
            # 分页
                                                        # 页数   每页数量   错误输出
                variety_page = variety_query.paginate(int(page), int(size), False)
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库异常")

            # 将数据转为JSON
            variety_list = variety_page.items  # 当前页中的数据结果
            total_page = variety_page.pages  # 总页数

            # 3. 需要对数据转JSON
            varietys = []
            for tv in variety_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                varietys.append(tv.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            variety_json = json.dumps(varietys)

            # 4. 保存redis中
            try:
                # 使用redis中的事务
                pipeline = redis_store.pipeline()
                # 开启事务
                pipeline.multi()
                map_temp = {"variety_json":variety_json, "total_page":total_page}
                pipeline.hmset(redis_key, map_temp)
                pipeline.expire(redis_key, 300)
                # 执行事务
                pipeline.execute()
            except Exception as e:
                logging.error(e)

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=0, errmsg="查询综艺成功", varietys=json.loads(variety_json), total_page=total_page, page=page)

api.add_resource(VarietyList, '/variety_list')

class VarietyDetail(Resource):
    def get(self):
        id = request.args.get("id")
        num = request.args.get("num", 1)

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            variety_json = redis_store.get('variety_' + id)
        except Exception as e:
            logging.error(e)
            variety_json = None

        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            variety_url = redis_store.get('variety_url_' + id + "_" + num)
        except Exception as e:
            logging.error(e)
            variety_url = None

        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            variety_nums_json = redis_store.get('variety_nums_' + id)
        except Exception as e:
            logging.error(e)
            variety_nums_json = None

        # 2. 没有缓存, 查询MySQL
        if not variety_json:
            # 查询MySQL所有的数据
            try:
                variety = Variety.query.filter_by(id=id).first()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not variety:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            # 3. 需要对数据转JSON
            variety_dict = variety.to_dict()

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            variety_json = json.dumps(variety_dict)

            # 4. 保存redis中
            try:
                redis_store.setex('variety_' + id, 300, variety_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        if not variety_url:
            # 查询MySQL所有的数据
            try:
                variety = VarietyNum.query.filter_by(variety_id=id, num=num).first()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not variety_url:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            variety_url = variety.get_real_url()

            # 4. 保存redis中
            try:
                redis_store.setex('variety_url_' + id + "_" + num, 300, variety_url)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()

        if not variety_nums_json:
            # 查询MySQL所有的数据
            try:
                variety_nums = VarietyNum.query.filter_by(variety_id=id).order_by(VarietyNum.num.asc()).all()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not variety_nums:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            variety_num_list = []
            for variety_num in variety_nums:
                variety_num_list.append(variety_num.num)

            variety_nums_json = json.dumps(variety_num_list)

            # 4. 保存redis中
            try:
                redis_store.setex('variety_num_' + id , 300, variety_nums_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询综艺成功", variety=json.loads(variety_json), variety_url=variety_url, variety_nums=json.loads(variety_nums_json), variety_num=str(num))

api.add_resource(VarietyDetail, '/variety')

class VarietyComments(Resource):
    def get(self):
        id = request.args.get("id")

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            comments_json = redis_store.get('variety_comment_' + id)
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not comments_json:
            # 查询MySQL所有的数据
            comments_list = VarietyComment.query.filter_by(variety_id=id).all()

            # 3. 需要对数据转JSON
            comments = []
            for comment in comments_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                comments.append(comment.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            comments_json = json.dumps(comments)

            # 4. 保存redis中
            try:
                redis_store.setex('variety_comment_' + id, 300, comments_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询综艺评论成功", comments=json.loads(comments_json))

    def post(self):
        username = session.get("username")
        variety_id = request.form.get("id")
        comment = request.form.get("comment")

        if not username:
            return jsonify(errno=RET.NODATA, errmsg="请先登陆")

        if not all([variety_id, comment]):
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 查询MySQL所有的数据
        variety_comment = VarietyComment(user_name=username, comment=comment, variety_id=variety_id)

        try:
            db.session.add(variety_comment)
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
            redis_store.delete('variety_comment_' + variety_id)
        except Exception as e:
            logging.error(e)

        # 二. 返回数据
        resp_dict = {
            'errno': RET.OK,
            'errmsg': '评论成功'
        }
        return jsonify(resp_dict)

api.add_resource(VarietyComments, '/variety_comments')