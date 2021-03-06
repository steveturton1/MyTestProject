__author__ = 'Steve'

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "../lib"))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import request, session, flash

engine = create_engine("mysql+mysqldb://root@localhost/mytestproject?charset=utf8&use_unicode=0", echo=True)
Session = sessionmaker(bind=engine)


def session_set():
    request._get_current_object().db_session = Session()


def session_close(exception):
    request._get_current_object().db_session.close()


def session_get():
    return request._get_current_object().db_session


def get_logged_user():
    if 'logged_in' in session and session['logged_in'] and 'user' in session:
        return session['user']

    return None