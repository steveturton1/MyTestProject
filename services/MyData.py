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

    garment_list = []
    for garment in garments:
        garment_list.append(dict(id=garment.id, name=garment.name, url_small=garment.url_small,
                                 url_medium=garment.url_medium))

    return garment_list

     #is this best if list is empty???????????????????????????????????????????

    #result = GarmentTransformer().to_json(garments)
    #return jsonify(data=result)


def get_motifs():
    motifs = session_get().query(Motifs).all()

    motif_list = []
    for motif in motifs:
        motif_list.append(dict(id=motif.id, name=motif.name, url=motif.url))

    # is this best if list is empty???????????????????????????????????????????
    return motif_list


def get_settings():
    for lang in settings.APPLICATION["i18N"]["LANGUAGES"]:
        # Translate each language value
        settings.APPLICATION["i18N"]["LANGUAGES"][lang] = gettext(lang)

    return settings.APPLICATION


def get_user():
    if 'logged_in' in session and session['logged_in'] and 'user' in session:
        return session['user']

    return None


def get_toolbar():

    # motifs = [
    #    {'id': 1, 'display_name': 'Bruce Lee',
    #     'img': url_for('static', filename='images/motifs/Bruce-lee-Hd-Wallpapers_3 - 2014-12-02.png')},
    #
    #    {'id': 2, 'display_name': 'Parental Advisory',
    #     'img': url_for('static', filename='images/motifs/Parental Advisory 16-3-2014 - TEXT TO PATH.svg')}
    # ]

    garments = get_garments()
    motifs = get_motifs()

    toolbar = {
        'shirts': {'selected': 1, 'list': garments},
        'motifs': {'list': motifs}
    }
    return toolbar