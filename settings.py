import logging

__author__ = 'Steve'


def info(*message):
    log(logging.INFO, *message)


def error(*message):
    log(logging.ERROR, *message)


def debug(message):
    log(logging.DEBUG, *message)


def log(level, *message):
    if APPLICATION["IS_TEST_MODE"]:
        print level, message
    else:
        logging.log(level, message)


APPLICATION = dict(
    IS_TEST_MODE=False,
    i18N={
        "LANGUAGES": {
            'en': 'English',
            'es': 'Espanol',
            'fr': 'French'
        }
    }
)
