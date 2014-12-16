__author__ = 'Steve'
from flask import session
from flask.ext.babel import gettext
import settings


def get_settings():
    for lang in settings.APPLICATION["i18N"]["LANGUAGES"]:
        # Translate each language value
        settings.APPLICATION["i18N"]["LANGUAGES"][lang] = gettext(lang)

    return settings.APPLICATION


def get_user():
    user = {}

    if 'logged_in' in session and session['logged_in']:
        user['id'] = 'testuser@test.co.uk'
        user['name'] = 'Steve Turton'
        return user
    else:
        return None
