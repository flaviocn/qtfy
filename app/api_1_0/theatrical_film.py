# coding:utf-8
from flask import json, jsonify

from app import redis_store, db
from app.models import TheatricalFilm
from . import api
from flask_restful import Resource, Api
import logging

api = Api(api)


class TheatricalFilmList(Resource):
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
            film_json = redis_store.get('theatrical_film_info')
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not film_json:
            # 查询MySQL所有的数据
            film_list = TheatricalFilm.query.all()

            # 3. 需要对数据转JSON
            films = []
            for film in film_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                films.append(film.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            film_json = json.dumps(films)

            # 4. 保存redis中
            try:
                redis_store.setex('theatrical_film_info', 300, film_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=0, errmsg="查询院线电影成功", films=json.loads(film_json))

api.add_resource(TheatricalFilmList, '/theatrical_film_list')
