# -*- coding:utf-8 -*-

from datetime import datetime

from flask.testsuite.config import SECRET_KEY

from app import constants
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


class BaseModel(object):
    """模型基类，为每个模型补充创建时间与更新时间"""

    create_time = db.Column(db.DateTime, default=datetime.now)  # 记录的创建时间
    update_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)  # 记录的更新时间


class User(BaseModel, db.Model):
    """用户"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)  # 用户编号
    username = db.Column(db.String(32), unique=True, nullable=False)  # 用户名
    password_hash = db.Column(db.String(128), nullable=False)  # 加密的密码
    email = db.Column(db.String(64), unique=True, nullable=False)  # 电子邮箱
    is_activate = db.Column(db.Boolean, default=False)  # 是否激活

    def generate_active_token(self):
        """生成激活令牌"""
        serializer = Serializer(SECRET_KEY, 3600)
        token = serializer.dumps({"confirm": self.id})  # 返回bytes类型
        return token.decode()

    @property
    def password(self):
        raise AttributeError

    @password.setter
    def password(self, value):
        self.password_hash = generate_password_hash(value)

    def check_password(self, value):
        return check_password_hash(self.password_hash, value)

# class Teleplay(BaseModel, db.Model):
#     """电视剧"""
#
#     __tablename__ = "teleplays"
#
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(32), nullable=False)
#     profile = db.Column(db.String(128), nullable=False) # 简介
#     premiere = db.Column(db.Date, nullable=False) # 首播
#     country = db.Column(db.String(32), nullable=False)
#     default_image = db.Column(db.String(128), nullable=False)
#     score = db.Column(db.Float, nullable=False)
#     is_delete = db.Column(db.Boolean, default=False)
#
class TheatricalFilm(BaseModel, db.Model):
    """院线电影"""

    __tablename__ = "theatrical_films"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    profile = db.Column(db.String(128), nullable=False) # 简介
    actor = db.Column(db.String(32), nullable=False) # 演员
    premiere = db.Column(db.Date, nullable=False) # 上映
    default_image = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Float, nullable=False)  # 评分
    url = db.Column(db.String(128), nullable=False)
    is_delete = db.Column(db.Boolean, default=False)

    def get_date(self):
        return self.premiere.strftime("%Y-%m-%d")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        film_dict = {
            "id": self.id,
            "name": self.name,
            "profile": self.profile,
            "actor": self.actor,
            "premiere": self.get_date(),
            "default_image": constants.QINIU_URL_DOMAIN + self.default_image,
            "score": self.score,
            "url": self.url
        }
        return film_dict

