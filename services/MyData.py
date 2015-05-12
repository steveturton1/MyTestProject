__author__ = 'Steve'
from flask import session, url_for, jsonify
from flask.ext.babel import gettext
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String
import settings
from common import *
from transformers import *

Base = declarative_base()


class Garments(Base):
    __tablename__ = 'garments'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    url_small = Column(String(255))
    url_medium = Column(String(255))


class Motifs(Base):
    __tablename__ = 'motifs'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    url = Column(String(255))


class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(255))
    name = Column(String(255))
    password = Column(String(255))


def getAllUsers():
    users = session_get().query(Users).all()
    return UserTransformer().to_json(users)


def load_user_from_db(email, password):
    user = session_get().query(Users).filter(Users.email == email).filter(Users.password == password).first()
    return user


def get_garments():
    garments = session_get().query(Garments).all()
    return GarmentTransformer().to_json(garments)


def get_motifs():
    motifs = session_get().query(Motifs).all()
    return MotifTransformer().to_json(motifs)


def get_settings():
    for lang in settings.APPLICATION["i18N"]["LANGUAGES"]:
        # Translate each language value
        settings.APPLICATION["i18N"]["LANGUAGES"][lang] = gettext(lang)

    return settings.APPLICATION


def get_toolbar():
    #pass a list of garments and motifs to be shown in toolbar
    garments = get_garments()
    motifs = get_motifs()

    toolbar = {
        'shirts': {'selected': 1, 'list': garments},
        'motifs': {'list': motifs}
    }
    return toolbar