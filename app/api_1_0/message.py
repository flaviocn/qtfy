# coding:utf-8
import logging

from flask import json
from flask import request, jsonify
from flask import session

from app import redis_store, db
from app.models import Message
from app.response_code import RET
from . import api
from flask_restful import Resource, Api

api = Api(api)

class Messages(Resource):
    def get(self):

        # 一. 处理业务逻辑
        # 1. 访问redis获取缓存
        try:
            # 直接获取JSON数据, 保存的也是JSON数据. 为了方便把数据返回给前端, 因此保存JSON返回JSON
            message_json = redis_store.get('message')
        except Exception as e:
            logging.error(e)
            # 为了避免异常的事情发生, 如果执行失败, 就把数据设置为None

        # 2. 没有缓存, 查询MySQL
        if not message_json:
            # 查询MySQL所有的数据
            message_list = Message.query.filter().all()

            if len(message_list) <= 0:
                return jsonify(errno=RET.OK, errmsg="暂无留言")

            # 3. 需要对数据转JSON
            messages = []
            for message in message_list:
                # 调用模型的转字典方法, 不断拼接成一个films
                messages.append(message.to_dict())

            # 将areas转换成JSON, 方便将来保存redis, 方便返回数据
                message_json = json.dumps(messages)

            # 4. 保存redis中
            try:
                redis_store.setex('message', 300, message_json)
                db.session.commit()
            except Exception as e:
                logging.error(e)
                db.session.rollback()
                # 这里如果出错, 可以不用返回错误信息. 因此如果redis没有保存, 那么下一次会直接访问Mysql读取数据, 再次保存

        # 5.如果有缓存, 返回缓存数据
        else:
            logging.info('当前数据从redis中读取的')

        # 二. 返回数据
        return jsonify(errno=RET.OK, errmsg="查询留言成功", comments=json.loads(message_json))

    def post(self):
        username = session.get("username")
        comment = request.form.get("comment")

        if not username:
            return jsonify(errno=RET.NODATA, errmsg="请先登陆")

        if not comment:
            return jsonify(errno=RET.PARAMERR, errmsg="参数错误")

        # 一. 处理业务逻辑
        # 查询MySQL所有的数据
        message = Message(user_name=username, message=comment)

        try:
            db.session.add(message)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logging.error(e)
            resp_dict = {
                'errno': RET.SERVERERR,
                'errmsg': '留言失败'
            }
            return jsonify(resp_dict)

        # 删除redis评论
        try:
            redis_store.delete('message')
        except Exception as e:
            logging.error(e)

        # 二. 返回数据
        resp_dict = {
            'errno': RET.OK,
            'errmsg': '评论成功'
        }
        return jsonify(resp_dict)

api.add_resource(Messages, '/message')