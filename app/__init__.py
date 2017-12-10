# coding:utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_session import Session
from config import config_dict
import redis
import logging
from logging.handlers import RotatingFileHandler
from app.utils.commons import RegexConverter

db = SQLAlchemy()

csrf = CSRFProtect()

redis_store = None

logging.basicConfig(level=logging.WARN)  # 调试debug级
# 创建日志记录器，指明日志保存的路径、每个日志文件的最大大小、保存的日志文件个数上限
file_log_handler = RotatingFileHandler("logs/log", maxBytes=1024*1024*100, backupCount=10)
# 创建日志记录的格式                 日志等级    输入日志信息的文件名 行数    日志信息
formatter = logging.Formatter('%(levelname)s %(filename)s:%(lineno)d %(message)s')
# 为刚创建的日志记录器设置日志记录格式
file_log_handler.setFormatter(formatter)
# 为全局的日志工具对象（flask app使用的）添加日后记录器
logging.getLogger().addHandler(file_log_handler)

def create_app(config_name):

    app = Flask(__name__)

    # app.url_map.converters['re'] 里面的re, 就是将来要使用的key, 随便写
    # 以后就可以使用re. 来实现之前定义的正则了
    app.url_map.converters['re'] = RegexConverter

    config = config_dict[config_name]
    app.config.from_object(config)

    db.init_app(app)

    csrf.init_app(app)

    global redis_store
    redis_store = redis.StrictRedis(config.REDIS_HOST, config.REDIS_PORT)

    from app.api_1_0 import api
    app.register_blueprint(api, url_prefix="/api/v1_0")

    import web_html
    app.register_blueprint(web_html.html)

    Session(app)

    return app

