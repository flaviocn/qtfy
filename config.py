# coding:utf-8

import redis

# 配置数据库地址, redis端口等参数, 以及调试模式/开发模式

class Config(object):

    SECRET_KEY = "flask"

    # flask-sqlalchemy使用的参数
    SQLALCHEMY_DATABASE_URI = "mysql://root:nsyzgjxzxywflm@127.0.0.1/qtfy"  # 数据库
    SQLALCHEMY_TRACK_MODIFICATIONS = True  # 追踪数据库的修改行为，如果不设置会报警告，不影响代码的执行

    # 配置redis的数据
    REDIS_HOST = '127.0.0.1'
    REDIS_PORT = 6379

    # 配置session存储到redis中
    PERMANENT_SESSION_LIFETIME = 86400 # 单位是秒, 设置session过期的时间
    SESSION_TYPE = 'redis' # 指定存储session的位置为redis
    SESSION_USE_SIGNER = True # 对数据进行签名加密, 提高安全性
    SESSION_REDIS = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT) # 设置redis的ip和端口

    # 配置邮件：服务器／端口／安全套接字层／邮箱名／授权码
    MAIL_SERVER = "smtp.163.com"
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = "flaviocn@163.com"
    MAIL_PASSWORD = "xywflm962464"
    MAIL_DEFAULT_SENDER = 'Flavio<flaviocn@163.com>'
    # current_app.config['MAIL_SERVER'] = "smtp.163.com"
    # current_app.config['MAIL_PORT'] = 465
    # current_app.config['MAIL_USE_SSL'] = True
    # current_app.config['MAIL_USERNAME'] = "flaviocn@163.com"
    # current_app.config['MAIL_PASSWORD'] = "xywflm962464"
    # current_app.config['MAIL_DEFAULT_SENDER'] = 'Flavio<flaviocn@163.com>'

class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    pass

# 参数字典, 用来方便的加载调试模式
config_dict = {
    'development' : DevelopmentConfig,
    'production' : ProductionConfig
}
