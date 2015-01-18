__author__ = 'Steve'
from flask import session, url_for
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
        user['id'] = 'steve.turton@cumptons.co.uk'
        user['name'] = 'Steve Turton'
        return user
    else:
        return None


def get_toolbar():
    # shirt = {}
    # shirt['id'] = 'caribbean-blue'
    # shirt['display_name'] = 'Caribbean Blue'
    # shirt['img_small'] = url_for('static', filename='images/shirts/anvil-caribbean-blue-small.jpg')
    # shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-caribbean-blue-medium.png')
    # shirts.append(shirt)

    # TODO pull this from the database
    shirts = [
        {'id': 'white', 'display_name': 'White',
         'img_small': url_for('static', filename='images/shirts/anvil-white-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-white-medium.png')},

        {'id': 'black', 'display_name': 'Black',
         'img_small': url_for('static', filename='images/shirts/anvil-black-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-black-medium.png')},

        {'id': 'apple', 'display_name': 'Apple',
         'img_small': url_for('static', filename='images/shirts/anvil-apple-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-apple-medium.png')},

        {'id': 'caribbean-blue', 'display_name': 'Caribbean Blue',
         'img_small': url_for('static', filename='images/shirts/anvil-caribbean-blue-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-caribbean-blue-medium.png')},

        {'id': 'charcoal', 'display_name': 'Charcoal',
         'img_small': url_for('static', filename='images/shirts/anvil-charcoal-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-charcoal-medium.png')},

        {'id': 'chocolate', 'display_name': 'Chocolate',
         'img_small': url_for('static', filename='images/shirts/anvil-chocolate-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-chocolate-medium.png')},

        {'id': 'city-green', 'display_name': 'City Green',
         'img_small': url_for('static', filename='images/shirts/anvil-city-green-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-city-green-medium.png')},

        {'id': 'heather-blue', 'display_name': 'Heather Blue',
         'img_small': url_for('static', filename='images/shirts/anvil-heather-blue-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-heather-blue-medium.png')},

        {'id': 'heather-dark-grey', 'display_name': 'Heather Dark Grey',
         'img_small': url_for('static', filename='images/shirts/anvil-heather-dark-grey-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-heather-dark-grey-medium.png')},

        {'id': 'heather-green', 'display_name': 'Heather Green',
         'img_small': url_for('static', filename='images/shirts/anvil-heather-green-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-heather-green-medium.png')},

        {'id': 'heather-grey', 'display_name': 'Heather Grey',
         'img_small': url_for('static', filename='images/shirts/anvil-heather-grey-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-heather-grey-medium.png')},

        {'id': 'heather-purple', 'display_name': 'Heather Purple',
         'img_small': url_for('static', filename='images/shirts/anvil-heather-purple-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-heather-purple-medium.png')},

        {'id': 'independence-red', 'display_name': 'Independence Red',
         'img_small': url_for('static', filename='images/shirts/anvil-independence-red-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-independence-red-medium.png')},

        {'id': 'kelly-green', 'display_name': 'Kelly Green',
         'img_small': url_for('static', filename='images/shirts/anvil-kelly-green-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-kelly-green-medium.png')},

        {'id': 'light-blue', 'display_name': 'Light Blue',
         'img_small': url_for('static', filename='images/shirts/anvil-light-blue-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-light-blue-medium.png')},

        {'id': 'navy', 'display_name': 'Navy',
         'img_small': url_for('static', filename='images/shirts/anvil-navy-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-navy-medium.png')},

        {'id': 'orange', 'display_name': 'Orange',
         'img_small': url_for('static', filename='images/shirts/anvil-orange-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-orange-medium.png')},

        {'id': 'purple', 'display_name': 'Purple',
         'img_small': url_for('static', filename='images/shirts/anvil-purple-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-purple-medium.png')},

        {'id': 'red', 'display_name': 'Red',
         'img_small': url_for('static', filename='images/shirts/anvil-red-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-red-medium.png')},

        {'id': 'royal-blue', 'display_name': 'Royal Blue',
         'img_small': url_for('static', filename='images/shirts/anvil-royal-blue-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-royal-blue-medium.png')},

        {'id': 'smoke', 'display_name': 'Smoke',
         'img_small': url_for('static', filename='images/shirts/anvil-smoke-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-smoke-medium.png')},

        {'id': 'spring-yellow', 'display_name': 'Spring Yellow',
         'img_small': url_for('static', filename='images/shirts/anvil-spring-yellow-small.jpg'),
         'img_medium': url_for('static', filename='images/shirts/anvil-spring-yellow-medium.png')}
    ]

    motifs = [
        {'id': 1, 'display_name': 'Bruce Lee',
         'img': url_for('static', filename='images/motifs/Bruce-lee-Hd-Wallpapers_3 - 2014-12-02.png')},

        {'id': 2, 'display_name': 'Parental Advisory',
         'img': url_for('static', filename='images/motifs/Parental Advisory 16-3-2014 - TEXT TO PATH.svg')}
    ]

    toolbar = {
        'shirts': {'selected': 'heather-green', 'list': shirts},
        'motifs': {'list': motifs}
    }
    return toolbar