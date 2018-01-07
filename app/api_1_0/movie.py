# coding:utf-8
from flask import json, jsonify, request
from flask import session

from app import redis_store, db
from app.response_code import RET
from app.models import Movie, MovieComment
from . import api
from flask_restful import Resource, Api
import logging

api = Api(api)

class MovieList(Resource):
    def get(self):
        """
            1. 访问redis获取缓存
            2. 没有缓存, 查询MySQL
            3. 需要对数据转JSON
            4. 保存redis中
            5. 如果有缓存, 返回缓存数据
            6. 返回给浏览器

            """

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            movie_recommend_json = redis_store.get('movie_list_recommend')
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not movie_recommend_json:
            # 查询MySQL所有的数据
            movie_recommend_list = Movie.query.order_by(Movie.update_time.desc()).all()[:20]

            if len(movie_recommend_list) <= 0:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询为空")

            # 3. 需要对数据转JSON
            movie_recommends = []
            for movie_recommend in movie_recommend_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                movie_recommends.append(movie_recommend.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            movie_recommend_json = json.dumps(movie_recommends)

            # 4. 保存redis中
            try:
                redis_store.setex('movie_list_recommend', 300, movie_recommend_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            movie_new_json = redis_store.get('movie_list_new')
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not movie_new_json:
            # 查询MySQL所有的数据
            movie_new_list = Movie.query.order_by(Movie.premiere.desc()).all()[:20]

            if len(movie_new_list) <= 0:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询为空")

            # 3. 需要对数据转JSON
            movie_news = []
            for movie_new in movie_new_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                movie_news.append(movie_new.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            movie_new_json = json.dumps(movie_news)

            # 4. 保存redis中
            try:
                redis_store.setex('movie_list_new', 300, movie_new_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            movie_score_json = redis_store.get('movie_list_score')
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not movie_score_json:
            # 查询MySQL所有的数据
            movie_score_list = Movie.query.order_by(Movie.score.desc()).all()[:20]

            if len(movie_score_list) <= 0:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询为空")

            # 3. 需要对数据转JSON
            movie_scores = []
            for movie_score in movie_score_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                movie_scores.append(movie_score.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            movie_score_json = json.dumps(movie_scores)

            # 4. 保存redis中
            try:
                redis_store.setex('movie_list_score', 300, movie_score_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=0, errmsg="查询电影列表成功", movie_recommend=json.loads(movie_recommend_json), movie_new=json.loads(movie_new_json), movie_score=json.loads(movie_score_json))

api.add_resource(MovieList, '/movie_list')

class MovieType(Resource):
    def get(self):
        """
            1. 访问redis获取缓存
            2. 没有缓存, 查询MySQL
            3. 需要对数据转JSON
            4. 保存redis中
            5. 如果有缓存, 返回缓存数据
            6. 返回给浏览器

            """

        # 一. 处理业务逻辑

        type = request.args.get('type', "1")
        page = request.args.get("page", "1")
        size = request.args.get("size", "10")

        redis_key = 'movie_list_' + type + "_" + page + "_" + size

        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            movie_json = redis_store.hget(redis_key, "movie_json")
            total_page = redis_store.hget(redis_key, "total_page")
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not movie_json:
            # 查询MySQL所有的数据
            try:
                movie_type_list = Movie.query.filter_by(type=type).order_by(Movie.update_time.desc())
                # 分页
                                                        # 页数     每页数量   错误输出
                movie_page = movie_type_list.paginate(int(page), int(size), False)
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库异常")

            if not movie_page:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询为空")

            # 将数据转为JSON
            movie_type_list = movie_page.items  # 当前页中的数据结果
            total_page = movie_page.pages  # 总页数

            # 3. 需要对数据转JSON
            movie_types = []
            for movie_type in movie_type_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                movie_types.append(movie_type.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            movie_json = json.dumps(movie_types)

            # 4. 保存redis中
            try:
                # 使用redis中的事务
                pipeline = redis_store.pipeline()
                # 开启事务
                pipeline.multi()
                map_temp = {"movie_json": movie_json, "total_page": total_page}
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
        return jsonify(errno=0, errmsg="查询电影列表成功", movies=json.loads(movie_json), total_page=total_page, page=page)

api.add_resource(MovieType, '/movie_type')

class MovieCountry(Resource):
    def get(self):
        """
            1. 访问redis获取缓存
            2. 没有缓存, 查询MySQL
            3. 需要对数据转JSON
            4. 保存redis中
            5. 如果有缓存, 返回缓存数据
            6. 返回给浏览器

            """

        # 一. 处理业务逻辑

        country = request.args.get('country', "1")
        page = request.args.get("page", "1")
        size = request.args.get("size", "10")

        redis_key = 'movie_list_' + country + "_" + page + "_" + size

        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            movie_json = redis_store.hget(redis_key, "movie_json")
            total_page = redis_store.hget(redis_key, "total_page")
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not movie_json:
            # 查询MySQL所有的数据
            try:
                movie_type_list = Movie.query.filter_by(country=country).order_by(Movie.update_time.desc())
                # 分页
                                                        # 页数     每页数量   错误输出
                movie_page = movie_type_list.paginate(int(page), int(size), False)
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库异常")

            if not movie_page:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询为空")

            # 将数据转为JSON
            movie_type_list = movie_page.items  # 当前页中的数据结果
            total_page = movie_page.pages  # 总页数

            # 3. 需要对数据转JSON
            movie_types = []
            for movie_type in movie_type_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                movie_types.append(movie_type.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            movie_json = json.dumps(movie_types)

            # 4. 保存redis中
            try:
                # 使用redis中的事务
                pipeline = redis_store.pipeline()
                # 开启事务
                pipeline.multi()
                map_temp = {"movie_json": movie_json, "total_page": total_page}
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
        return jsonify(errno=0, errmsg="查询电影列表成功", movies=json.loads(movie_json), total_page=total_page, page=page)

api.add_resource(MovieCountry, '/movie_country')

class MovieDetail(Resource):
    def get(self):
        id = request.args.get("id")

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            movie_json = redis_store.get('movie_' + id)
        except Exception as e:
            logging.error(e)
            movie_json = None

        # 2. 没有缓存, 查询MySQL
        if not movie_json:
            # 查询MySQL所有的数据
            try:
                movie = Movie.query.filter_by(id=id).first()
            except Exception as e:
                logging.error(e)
                return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")

            if not movie:
                return jsonify(errno=RET.DBERR, errmsg="数据库查询为空")

            # 3. 需要对数据转JSON
            movie_dict = movie.to_dict()

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            movie_json = json.dumps(movie_dict)

            # 4. 保存redis中
            try:
                redis_store.setex('movie_' + id, 300, movie_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询电影成功", movie=json.loads(movie_json))

api.add_resource(MovieDetail, '/movie')

class MovieComments(Resource):
    def get(self):
        id = request.args.get("id")

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            comments_json = redis_store.get('movie_comment_' + id)
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not comments_json:
            # 查询MySQL所有的数据
            comments_list = MovieComment.query.filter_by(movie_id=id).all()

            # 3. 需要对数据转JSON
            comments = []
            for comment in comments_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                comments.append(comment.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            comments_json = json.dumps(comments)

            # 4. 保存redis中
            try:
                redis_store.setex('movie_comment_' + id, 300, comments_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询电影评论成功", comments=json.loads(comments_json))

    def post(self):
        username = session.get("username")
        movie_id = request.form.get("id")
        comment = request.form.get("comment")

        if not username:
            return jsonify(errno=RET.NODATA, errmsg="请先登陆")

        if not all([movie_id, comment]):
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 查询MySQL所有的数据
        movie_comment = MovieComment(user_name=username, comment=comment, movie_id=movie_id)

        try:
            db.session.add(movie_comment)
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
            redis_store.delete('movie_comment_' + movie_id)
        except Exception as e:
            logging.error(e)

        # 二. 返回数据
        resp_dict = {
            'errno': RET.OK,
            'errmsg': '评论成功'
        }
        return jsonify(resp_dict)

api.add_resource(MovieComments, '/movie_comments')
