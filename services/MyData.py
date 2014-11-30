__author__ = 'Steve'
from flask import session
from flask.ext.babel import gettext
import settings


def get_settings():
    for lang in settings.APPLICATION["i18N"]["LANGUAGES"]:
        #Translate each language value
        settings.APPLICATION["i18N"]["LANGUAGES"][lang] = gettext(lang)

    settings.APPLICATION["i18N"]["CURRENT_LANGUAGE"] = gettext(session['language'])
    return settings.APPLICATION
