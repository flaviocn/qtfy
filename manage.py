# coding:utf-8

from flask_admin import Admin
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import create_app, db
from app.models import User, Movie, MovieComment, TheatricalFilm, TheatricalFilmComment, TvShow, TvShowNum, TvShowComment, Variety, VarietyNum, VarietyComment, News, Message
from flask_admin.contrib.sqla import ModelView
from flask_babelex import Babel

app = create_app("development")
manage = Manager(app)
admin = Admin(app, name=u'后台管理系统')

# 在这里初始化Flask Flask-SQLAlchemy Flask-Admin

# admin.add_view(ModelView(User, db.session))
# admin.add_view(ModelView(Movie, db.session))
# admin.add_view(ModelView(MovieComment, db.session))
# admin.add_view(ModelView(TheatricalFilm, db.session))
# admin.add_view(ModelView(TheatricalFilmComment, db.session))
# admin.add_view(ModelView(TvShow, db.session))
# admin.add_view(ModelView(TvShowNum, db.session))
# admin.add_view(ModelView(TvShowComment, db.session))
# admin.add_view(ModelView(Variety, db.session))
# admin.add_view(ModelView(VarietyNum, db.session))
# admin.add_view(ModelView(VarietyComment, db.session))
# admin.add_view(ModelView(News, db.session))
# admin.add_view(ModelView(Message, db.session))

babel = Babel(app)

app.config['BABEL_DEFAULT_LOCALE'] = 'zh_CN'

migragt = Migrate(app, db)
manage.add_command("db", MigrateCommand)

if __name__ == '__main__':
    manage.run()
