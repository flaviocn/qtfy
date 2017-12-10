# coding:utf-8
import logging
import re
from app import redis_store, db
from app.constants import LOGIN_ERROR_MAX_NUM, LOGIN_ERROR_FORBID_TIME
from app.models import User
from app.response_code import RET
from . import api
from flask import request, jsonify, session
from app.utils.commons import login_required
from flask_restful import Resource, Api

api = Api(api)

class Register(Resource):
    def post(self):
        # 用户名  电子邮箱  密码
        resp_dict = request.get_json()
        username = resp_dict.get("username")
        email = resp_dict.get("email")
        password = resp_dict.get("password")

        if not all([username, email, password]):
            resp_dict = {
                'errno': RET.PARAMERR,
                'errmsg': '参数不完整'
            }
            return jsonify(resp_dict)

        if re.match(r'[-_\w\.]{0,64}@([-\w]{1,63}\.)*[-\w]{1,63}', email) is None:
            resp_dict = {
                'errno': RET.PARAMERR,
                'errmsg': '邮箱格式错误'
            }
            return jsonify(resp_dict)

        user = User(name=username, email=email)
        user.password = password

        try:
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logging.error(e)
            resp_dict = {
                'errno': RET.SERVERERR,
                'errmsg': '注册失败'
            }
            return jsonify(resp_dict)

        session['id'] = user.id
        session['username'] = username
        session['email'] = email

        resp_dict = {
            'errno': RET.OK,
            'errmsg': '注册成功'
        }
        return jsonify(resp_dict)

api.add_resource(Register, '/users')

# @api.route("/users", methods=["POST"])
# def register():
#     # 手机号  短信验证码  密码
#     resp_dict = request.get_json()
#     mobile = resp_dict.get("mobile")
#     sms_code = resp_dict.get("sms_code")
#     password = resp_dict.get("password")
#
#     if not all([mobile, sms_code, password]):
#         resp_dict = {
#             'errno': RET.PARAMERR,
#             'errmsg': '参数不完整'
#         }
#         return jsonify(resp_dict)
#
#     if re.match(r'1[34578]\d{9}', mobile) is None:
#         resp_dict = {
#             'errno': RET.PARAMERR,
#             'errmsg': '手机号格式错误'
#         }
#         return jsonify(resp_dict)
#
#     try:
#         redis_sms_code = redis_store.get("sms_code_" + mobile)
#     except Exception as e:
#         logging.error(e)
#         resp_dict = {
#             'errno': RET.DBERR,
#             'errmsg': '数据库查询错误'
#         }
#         return jsonify(resp_dict)
#
#     if redis_sms_code is None:
#         resp_dict = {
#             'errno': RET.NODATA,
#             'errmsg': '短信验证码已失效'
#         }
#         return jsonify(resp_dict)
#
#     if sms_code != redis_sms_code:
#         resp_dict = {
#             'errno': RET.PARAMERR,
#             'errmsg': '短信验证码错误'
#         }
#         return jsonify(resp_dict)
#
#     try:
#         redis_store.delete("sms_code_" + mobile)
#     except Exception as e:
#         logging.error(e)
#
#     user = User(name=mobile, mobile=mobile)
#     user.password = password
#
#     try:
#         db.session.add(user)
#         db.session.commit()
#     except Exception as e:
#         db.session.rollback()
#         logging.error(e)
#         resp_dict = {
#             'errno': RET.SERVERERR,
#             'errmsg': '注册失败'
#         }
#         return jsonify(resp_dict)
#
#     session['id'] = user.id
#     session['name'] = mobile
#     session['mobile'] = mobile
#
#     resp_dict = {
#         'errno': RET.OK,
#         'errmsg': '注册成功'
#     }
#     return jsonify(resp_dict)
#
# @api.route("/sessions", methods=["POST"])
# def login():
#     user_ip = request.remote_addr
#     try:
#         # 保存错误次数的key, 为access+userIP
#         access_counts = redis_store.get('access_' + user_ip)
#     except Exception as e:
#         logging.error(e)
#
#     if access_counts is not None and int(access_counts) >= LOGIN_ERROR_MAX_NUM:
#         resp_dict = {
#             'errno': RET.REQERR,
#             'errmsg': '错误登录频繁，请稍后再试'
#         }
#         return jsonify(resp_dict)
#
#     resp_dict = request.get_json()
#     mobile = resp_dict.get("mobile")
#     password = resp_dict.get("password")
#
#     if not all([mobile, password]):
#         resp_dict = {
#             'errno': RET.PARAMERR,
#             'errmsg': '参数不完整'
#         }
#         return jsonify(resp_dict)
#
#     if re.match(r'1[34578]\d{9}', mobile) is None:
#         resp_dict = {
#             'errno': RET.PARAMERR,
#             'errmsg': '手机号格式错误'
#         }
#         return jsonify(resp_dict)
#
#     # 业务逻辑
#     try:
#         user = User.query.filter_by(mobile=mobile).first()
#     except Exception as e:
#         logging.error(e)
#         resp_dict = {
#             'errno': RET.DBERR,
#             'errmsg': '数据库查询错误'
#         }
#         return jsonify(resp_dict)
#
#     if not user or not user.check_password(password):
#         # 累加错误次数, 并设置时间
#         try:
#             # incr:累加错误次数
#             redis_store.incr('access_' + user_ip)
#             # expire: 第一个参数 key, 第二个参数 过期时间
#             redis_store.expire('access_' + user_ip, LOGIN_ERROR_FORBID_TIME)
#         except Exception as e:
#             logging.error(e)
#
#         resp_dict = {
#             'errno': RET.DATAERR,
#             'errmsg': '手机号或者密码错误'
#         }
#         return jsonify(resp_dict)
#
#     try:
#         redis_store.delete('access_' + user_ip)
#     except Exception as e:
#         logging.error(e)
#
#     session['id'] = user.id
#     session['name'] = mobile
#     session['mobile'] = mobile
#
#     resp_dict = {
#         'errno': RET.OK,
#         'errmsg': '登陆成功'
#     }
#     return jsonify(resp_dict)
#
# @api.route("/sessions", methods=["GET"])
# def check_login():
#     """检查登陆状态"""
#     # 尝试从session中获取用户的名字
#     name = session.get("name")
#     # 如果session中数据name名字存在，则表示用户已登录，否则未登录
#     if name is not None:
#         return jsonify(errno=RET.OK, errmsg="true", data={"name": name})
#     else:
#         return jsonify(errno=RET.SESSIONERR, errmsg="false")
#
# @api.route("/sessions", methods=["DELETE"])
# # @api.route("/sessions", methods=["DELETE"])
# @login_required
# def logout():
#     session.clear()
#     resp_dict = {
#         'errno': RET.OK,
#         'errmsg': '退出登录成功'
#     }
#     return jsonify(resp_dict)
