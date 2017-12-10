# coding=utf-8

# 一些公用的工具类放到这里

from werkzeug.routing import BaseConverter
from flask import session, g, jsonify
from functools import wraps

from app.response_code import RET


class RegexConverter(BaseConverter):
    # url_map路由映射字典
    def __init__(self, url_map, regex):
        # regex: 就是路由里的正则表达式. 目前只有一个, 因此也可以用regex来表示
        super(RegexConverter, self).__init__(url_map)
        self.regex = regex

def login_required(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        user_id = session.get("id")
        if user_id is not None:
            g.user_id = user_id
            return view_func(*args, **kwargs)
        else:
            resp_dict = {
                'errno': RET.SESSIONERR,
                'errmsg': '用户未登录'
            }
            return jsonify(resp_dict)

    return wrapper
