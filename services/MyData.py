__author__ = 'Steve'
from flask import session, url_for
from flask.ext.babel import gettext
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String
import settings
from common import *

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


def get_garments():
    garments = session_get().query(Garments).all()

    garment_list = []
    for garment in garments:
        garment_list.append(dict(id=garment.id, name=garment.name, url_small=garment.url_small,
                                 url_medium=garment.url_medium))

    # is this best if list is empty???????????????????????????????????????????
    return garment_list


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
    user = {}

    if 'logged_in' in session and session['logged_in']:
        user['id'] = 'steve.turton@cumptons.co.uk'
        user['name'] = 'Steve Turton'
        return user
    else:
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