# coding:utf-8
from flask import Blueprint

api = Blueprint("api_1_0", __name__)

import passport, theatrical_film, tvshow, variety, new, message, movie
