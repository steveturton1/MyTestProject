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
    toolbar = {}

    # TODO pull this from the database
    shirts = []

    shirt = {}
    shirt['id'] = 'white'
    shirt['display_name'] = 'White'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-white-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-white-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'black'
    shirt['display_name'] = 'Black'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-black-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-black-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'apple'
    shirt['display_name'] = 'Apple'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-apple-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-apple-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'caribbean-blue'
    shirt['display_name'] = 'Caribbean Blue'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-caribbean-blue-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-caribbean-blue-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'charcoal'
    shirt['display_name'] = 'Charcoal'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-charcoal-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-charcoal-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'chocolate'
    shirt['display_name'] = 'Chocolate'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-chocolate-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-chocolate-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'city-green'
    shirt['display_name'] = 'City Green'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-city-green-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-city-green-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'heather-blue'
    shirt['display_name'] = 'Heather Blue'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-heather-blue-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-heather-blue-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'heather-dark-grey'
    shirt['display_name'] = 'Heather Dark Grey'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-heather-dark-grey-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-heather-dark-grey-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'heather-green'
    shirt['display_name'] = 'Heather Green'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-heather-green-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-heather-green-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'heather-grey'
    shirt['display_name'] = 'Heather Grey'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-heather-grey-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-heather-grey-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'heather-purple'
    shirt['display_name'] = 'Heather Purple'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-heather-purple-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-heather-purple-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'independence-red'
    shirt['display_name'] = 'Independence Red'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-independence-red-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-independence-red-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'kelly-green'
    shirt['display_name'] = 'Kelly Green'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-kelly-green-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-kelly-green-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'light-blue'
    shirt['display_name'] = 'Light Blue'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-light-blue-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-light-blue-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'navy'
    shirt['display_name'] = 'Navy'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-navy-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-navy-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'orange'
    shirt['display_name'] = 'Orange'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-orange-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-orange-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'purple'
    shirt['display_name'] = 'Purple'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-purple-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-purple-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'red'
    shirt['display_name'] = 'Red'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-red-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-red-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'royal-blue'
    shirt['display_name'] = 'Royal Blue'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-royal-blue-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-royal-blue-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'smoke'
    shirt['display_name'] = 'Smoke'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-smoke-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-smoke-medium.png')
    shirts.append(shirt)

    shirt = {}
    shirt['id'] = 'spring-yellow'
    shirt['display_name'] = 'Spring Yellow'
    shirt['img_small'] = url_for('static', filename='images/shirts/anvil-spring-yellow-small.jpg')
    shirt['img_medium'] = url_for('static', filename='images/shirts/anvil-spring-yellow-medium.png')
    shirts.append(shirt)

    toolbar['shirts'] = {}
    toolbar['shirts']['selected'] = "apple"     # default to the white one being selected.
    toolbar['shirts']['list'] = shirts

    return toolbar