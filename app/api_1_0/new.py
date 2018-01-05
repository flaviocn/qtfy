# coding:utf-8
import json
import logging

from flask import jsonify
from flask import request

from app import redis_store, db
from app.models import News
from app.response_code import RET
from . import api
from flask_restful import Resource, Api

api = Api(api)

class NewList(Resource):
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
            news_json = redis_store.get('news_list_info')
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not news_json:
            # 查询MySQL所有的数据
            news_list = News.query.all()

            # 3. 需要对数据转JSON
            news = []
            for new in news_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                news.append(new.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            news_json = json.dumps(news)

            # 4. 保存redis中
            try:
                redis_store.setex('news_list_info', 300, news_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=0, errmsg="查询新闻列表成功", news=json.loads(news_json))

api.add_resource(NewList, '/news_list')

class New(Resource):
    def get(self):
        id = request.args.get("id")

        if not id:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            new_json = redis_store.get('new_' + id)
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not new_json:
            # 查询MySQL所有的数据
            new = News.query.filter_by(id=id).first()

            new_dict = new.to_dict()

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
            new_json = json.dumps(new_dict)

            # 4. 保存redis中
            try:
                redis_store.setex('new_' + id, 300, new_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询新闻成功", new=json.loads(new_json))


api.add_resource(New, '/new')
