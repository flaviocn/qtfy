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

class Movie(BaseModel, db.Model):
    """电影"""

    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    profile = db.Column(db.String(128), nullable=False) # 简介
    country = db.Column(db.SmallInteger, nullable=False) # 国家
    type = db.Column(db.SmallInteger, nullable=False) # 类型
    actor = db.Column(db.String(32), nullable=False)
    premiere = db.Column(db.Date, nullable=False) # 上映时间
    default_image = db.Column(db.String(128), nullable=False)
    url = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Float, nullable=False)
    is_delete = db.Column(db.Boolean, default=False)

    def get_date(self):
        return self.premiere.strftime("%Y-%m-%d")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        movie_dict = {
            "id": self.id,
            "name": self.name,
            "profile": self.profile,
            "premiere": self.get_date(),
            "year": self.get_date()[:4],
            "actor": self.actor,
            "default_image": constants.QINIU_URL_DOMAIN + self.default_image,
            "score": self.score,
            "url": constants.QINIU_URL_DOMAIN + self.url,
        }
        return movie_dict

class MovieComment(BaseModel, db.Model):
    """电影评论"""

    __tablename__ = "movies_comment"

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32), nullable=False)
    comment = db.Column(db.String(128), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)  # 院线电影id

    def get_date_time(self, date_time):
        return date_time.strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        movie_dict = {
            "id": self.id,
            "user_name": self.user_name,
            "comment": self.comment,
            "date_time": self.get_date_time(self.create_time)
        }
        return movie_dict

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
            "url": constants.QINIU_URL_DOMAIN + self.url
        }
        return film_dict

class TheatricalFilmComment(BaseModel, db.Model):
    """院线电影评论"""

    __tablename__ = "theatrical_films_comment"

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32), nullable=False)
    comment = db.Column(db.String(128), nullable=False)
    theatrical_film_id = db.Column(db.Integer, db.ForeignKey("theatrical_films.id"), nullable=False)  # 院线电影id

    def get_date_time(self, date_time):
        return date_time.strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        film_dict = {
            "id": self.id,
            "user_name": self.user_name,
            "comment": self.comment,
            "date_time": self.get_date_time(self.create_time)
        }
        return film_dict

class TvShow(BaseModel, db.Model):
    """电视剧"""

    __tablename__ = "tv_shows"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    profile = db.Column(db.String(128), nullable=False) # 简介
    type = db.Column(db.SmallInteger, nullable=False) # 类型
    actor = db.Column(db.String(32), nullable=False)
    premiere = db.Column(db.Date, nullable=False) # 首播
    default_image = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Float, nullable=False)
    is_delete = db.Column(db.Boolean, default=False)

    def get_date(self):
        return self.premiere.strftime("%Y-%m-%d")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        tv_dict = {
            "id": self.id,
            "name": self.name,
            "profile": self.profile,
            "premiere": self.get_date(),
            "actor": self.actor,
            "default_image": constants.QINIU_URL_DOMAIN + self.default_image,
            "score": self.score,
        }
        return tv_dict

class TvShowNum(BaseModel, db.Model):
    __tablename__ = "tv_shows_detail"

    id = db.Column(db.Integer, primary_key=True)
    num = db.Column(db.SmallInteger, nullable=False)  # 集数
    url = db.Column(db.String(128), nullable=False)
    tv_id = db.Column(db.Integer, db.ForeignKey("tv_shows.id"), nullable=False)  # 电视剧id

    def get_real_url(self):
        return constants.QINIU_URL_DOMAIN + self.url

class TvShowComment(BaseModel, db.Model):
    """院线电影评论"""

    __tablename__ = "tv_shows_comment"

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32), nullable=False)
    comment = db.Column(db.String(128), nullable=False)
    tv_show_id = db.Column(db.Integer, db.ForeignKey("tv_shows.id"), nullable=False)  # 电视剧id

    def get_date_time(self, date_time):
        return date_time.strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        film_dict = {
            "id": self.id,
            "user_name": self.user_name,
            "comment": self.comment,
            "date_time": self.get_date_time(self.create_time)
        }
        return film_dict

class Variety(BaseModel, db.Model):
    """综艺"""

    __tablename__ = "varietys"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    profile = db.Column(db.String(128), nullable=False) # 简介
    type = db.Column(db.SmallInteger, nullable=False) # 类型
    actor = db.Column(db.String(32), nullable=False)
    premiere = db.Column(db.Date, nullable=False) # 首播
    default_image = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Float, nullable=False)
    is_delete = db.Column(db.Boolean, default=False)

    def get_date(self):
        return self.premiere.strftime("%Y-%m-%d")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        tv_dict = {
            "id": self.id,
            "name": self.name,
            "profile": self.profile,
            "premiere": self.get_date(),
            "actor": self.actor,
            "default_image": constants.QINIU_URL_DOMAIN + self.default_image,
            "score": self.score,
        }
        return tv_dict

class VarietyNum(BaseModel, db.Model):
    __tablename__ = "variety_detail"

    id = db.Column(db.Integer, primary_key=True)
    num = db.Column(db.SmallInteger, nullable=False)  # 集数
    url = db.Column(db.String(128), nullable=False)
    variety_id = db.Column(db.Integer, db.ForeignKey("varietys.id"), nullable=False)  # 综艺id

    def get_real_url(self):
        return constants.QINIU_URL_DOMAIN + self.url

class VarietyComment(BaseModel, db.Model):
    """综艺评论"""

    __tablename__ = "variety_comment"

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32), nullable=False)
    comment = db.Column(db.String(128), nullable=False)
    variety_id = db.Column(db.Integer, db.ForeignKey("varietys.id"), nullable=False)  # 电视剧id

    def get_date_time(self, date_time):
        return date_time.strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        film_dict = {
            "id": self.id,
            "user_name": self.user_name,
            "comment": self.comment,
            "date_time": self.get_date_time(self.create_time)
        }
        return film_dict

class News(BaseModel, db.Model):
    """新闻"""

    __tablename__ = "news"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32), nullable=False) # 标题
    content = db.Column(db.Text(8192), nullable=False) # 内容
    default_image = db.Column(db.String(128), nullable=False) # 图片

    def to_dict(self):
        new_dict = {
            "id": self.id,
            "title": self.title,
            "profile": self.content[:200],
            "content": self.content,
            "default_image": constants.QINIU_URL_DOMAIN + self.default_image
        }
        return new_dict

class Message(BaseModel, db.Model):
    """留言"""

    __tablename__ = "message"

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32), nullable=False)
    message = db.Column(db.String(128), nullable=False)

    def get_date_time(self, date_time):
        return date_time.strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        """自定义的方法，将对象转换为字典"""

        mess_dict = {
            "id": self.id,
            "user_name": self.user_name,
            "comment": self.message,
            "date_time": self.get_date_time(self.create_time)
        }
        return mess_dict

movie_type = {
    '爱情':1,
    '喜剧':2,
    '动作':3,
    '剧情':4,
    '科幻':5,
    '恐怖':6,
    '动画':7,
    '惊悚':8,
    '犯罪':9
}

movie_country = {
    '大陆': 1,
    '香港': 2,
    '台湾': 3,
    '美国': 4,
    '韩国': 5,
    '日本': 6,
    '泰国': 7,
    '其他': 8
}
