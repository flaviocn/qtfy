# coding:utf-8
import logging
import re

from flask import current_app
from flask import redirect
from flask.testsuite.config import SECRET_KEY

from app import redis_store, db
from app.constants import LOGIN_ERROR_MAX_NUM, LOGIN_ERROR_FORBID_TIME
from app.models import User
from app.response_code import RET
from app.utils.send_email import send_email_thread
from . import api
from flask import request, jsonify, session
from app.utils.commons import login_required
from flask_restful import Resource, Api
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import render_template

api = Api(api)

class Users(Resource):
    """用户操作"""
    # 判断用户名是否存在
    def get(self):
        username = request.args.get("username")
        email = request.args.get("email")

        if all([username, email]):
            try:
                user_username = User.query.filter_by(username=username).first()
                user_email = User.query.filter_by(email=email).first()
            except Exception as e:
                logging.error(e)
                resp_dict = {
                    'errno': RET.PARAMERR,
                    'errmsg': '参数错误'
                }
                return jsonify(resp_dict)

            if user_username:
                resp_dict = {
                    'errno': RET.DATAEXIST,
                    'errmsg': '用户名已存在'
                }
                return jsonify(resp_dict)

            if user_email:
                resp_dict = {
                    'errno': RET.DATAEXIST,
                    'errmsg': '该邮箱已注册'
                }
                return jsonify(resp_dict)

        resp_dict = {
            'errno': RET.OK,
            'errmsg': '可以注册'
        }
        return jsonify(resp_dict)

    # 注册
    def post(self):
        # 用户名  电子邮箱  密码
        resp_dict = request.get_json()
        # resp_dict = request.args
        username = resp_dict.get("username")
        email = resp_dict.get("email")
        password = resp_dict.get("password")

        print username
        print email

        if not all([username, email, password]):
            resp_dict = {
                'errno': RET.PARAMERR,
                'errmsg': '参数不完整'
            }
            return jsonify(resp_dict)

        if not re.match(r'[-_\w\.]{0,64}@([-\w]{1,63}\.)*[-\w]{1,63}', email):
            resp_dict = {
                'errno': RET.PARAMERR,
                'errmsg': '邮箱格式错误'
            }
            return jsonify(resp_dict)

        try:
            user = User.query.filter_by(username=username).first()
        except Exception as e:
            logging.error(e)

        if user:
            resp_dict = {
                'errno': RET.DATAEXIST,
                'errmsg': '用户名已存在'
            }
            return jsonify(resp_dict)

        try:
            user = User.query.filter_by(email=email).first()
        except Exception as e:
            logging.error(e)

        if user:
            resp_dict = {
                'errno': RET.DATAEXIST,
                'errmsg': '该邮箱已注册'
            }
            return jsonify(resp_dict)

        user = User(username=username, email=email)
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

        token = user.generate_active_token()

        url = "http://127.0.0.1:5000/api/v1_0/state?token=%s" % token
        content = u"<h3>点击链接激活您的账号：</h3><a href='%s'>%s</a>" %(url, url)
        send_email_thread('（且听风吟）账号激活', to=email, content=content)

        resp_dict = {
            'errno': RET.OK,
            'errmsg': '注册成功'
        }
        return jsonify(resp_dict)

api.add_resource(Users, '/users')

class Activate(Resource):
    def get(self):
        # 解析口令token，获取用户身份
        # 构建序列化器
        token = request.args.get("token")
        s = Serializer(SECRET_KEY)

        try:
            data = s.loads(token)
        except Exception as e:
            logging.error(e)
            return redirect('error_timeout.html')

        user_id = data.get("confirm")

        # 用户激活
        try:
            User.query.filter_by(id=user_id).update({"is_activate": True})
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logging.error(e)

            return redirect("error_activate.html")

        try:
            user = User.query.filter_by(id=user_id).first()
            session['id'] = user.id
            session['username'] = user.username
            session['email'] = user.email
        except Exception as e:
            logging.error(e)

        return redirect('/')

api.add_resource(Activate, '/state')

class Session(Resource):
    # 判断是否登录
    def get(self):
        # 尝试从session中获取用户的名字
        username = session.get("username")
        email = session.get("email")
        # 如果session中数据name名字存在，则表示用户已登录，否则未登录
        if all([username, email]):
            return jsonify(errno=RET.OK, errmsg="true", data={"username": username, "email": email})
        else:
            return jsonify(errno=RET.SESSIONERR, errmsg="false")

    # 登录
    def post(self):
        # 一. 获取参数
        resp_json = request.get_json()
        email = resp_json.get('email')
        password = resp_json.get('password')

        # 二. 检查完整性及有效性
        if not all([email, password]):
            return jsonify(errno=RET.PARAMERR, errmsg='参数不完整')

        if not re.match(r'[-_\w\.]{0,64}@([-\w]{1,63}\.)*[-\w]{1,63}', email):
            return jsonify(errno=RET.PARAMERR, errmsg='邮箱格式错误')

        # 三. 业务逻辑处理
        # 1. try:判断用户的登录错误次数
        # 如果用户在redis中存储的错误次数过多, 不需要在判断了, 直接返回即可
        user_ip = request.remote_addr
        try:
            # 保存错误次数的key, 为access+userIP
            access_counts = redis_store.get('access_' + user_ip)
        except Exception as e:
            logging.error(e)
            return jsonify(errno=RET.DBERR, errmsg='查询数据库失败')

        # 如果有错误记录, 加入已经是6次登录, 而我们设置的最大次数是5. 此时直接返回(登录太频繁, 请稍后再试)即可
        # 判断是否超过了最大的限制次数
        # 错误次数不为空 and 错误次数超过了最大值 --> 直接返回
        if access_counts is not None and int(access_counts) >= 5:
            return jsonify(errno=RET.REQERR, errmsg='请求已超过最大次数')

        # 2. try:查询数据库, 判断用户信息与密码
        try:
            user = User.query.filter_by(email=email).first()
        except Exception as e:
            logging.error(e)
            return jsonify(errno=RET.DBERR, errmsg='查询用户数据失败')

        # 同时对用户名和密码做判断, 只要有一个错误的, 就告诉用户: 用户名或密码输入错误
        # pbkdf2:sha256:50000$ym86IiQY$aba9ba50157890e30a5e8d948b6a8e4c62a1ab23ae2cd540ff20992ff864ccb5
        # 加密后, 两个$$之间的就是盐值, 每个记录都不一样
        if user is None or not user.check_password(password):

            # 累加错误次数, 并设置时间
            try:
                # incr:累加错误次数
                redis_store.incr('access_' + user_ip)
                # expire: 第一个参数 key, 第二个参数 过期时间
                redis_store.expire('access_' + user_ip, 600)
            except Exception as e:
                logging.error(e)

            return jsonify(errno=RET.LOGINERR, errmsg='用户名或密码输入错误')

        # 3. try:如果手机和密码都正确, 说明登录成功, 清除之前保存的错误次数
        try:
            redis_store.delete('access_' + user_ip)
        except Exception as e:
            logging.error(e)

        # 4. 设置session
        session['id'] = user.id
        session['username'] = user.username
        session['email'] = user.email

        # 四. 返回值
        return jsonify(errno=RET.OK, errmsg='用户登录成功')

    # 注销
    def delete(self):
        # 清除session数据
        session.clear()
        return jsonify(errno=RET.OK, errmsg="OK")

api.add_resource(Session, '/sessions')

