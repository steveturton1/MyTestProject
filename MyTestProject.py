from flask import Flask, render_template, request, session, jsonify, redirect, url_for, flash, abort
from flask.ext.babel import Babel, refresh, gettext
import settings
import services.MyData
import services.common

app = Flask(__name__)
app.debug = True

# needed for sessions - note can use import os; os.random(24) to generate a new key if needed.
app.secret_key = '\xc1\x85\xb8\xb2\x9f-1\xd61rGtB\x7f\xaa\xfb\xa1\xacT|I\xd9\xd2"'

babel = Babel(app)


@app.before_request
def before_request():
    services.common.session_set()


@app.teardown_request
def teardown_request(exception):
    services.common.session_close(exception)


@app.before_request
def app_initialise():
    # IS THIS NEEDED ANY MORE ???? COULD PASS IT INTO TEMPLATE WITH SETTINGS
    # Set the language - would need some validation if done correctly.
    # needed this because if you shut the browser down and bring back up, goto home page again, then
    # session["language"] is blank and so in layout.html, the first thing it does is use session["language"] which
    # it won't have.  Tried doing this in before_first_request but that doesn;t get fired when launching
    # the browser again.
    if request.cookies.get('language') is not None:
        session["language"] = request.cookies.get('language')
    else:
        session["language"] = request.accept_languages.best_match(settings.APPLICATION["i18N"]["LANGUAGES"].keys())


@app.route('/', methods=['GET', 'POST'])
def login():


    if request.method == 'POST':
        if request.form['email'] != 'steve.turton@cumptons.co.uk':
            session.pop('logged_in', None)
            flash('The login information you have entered is not valid.')
        else:
            session['logged_in'] = True
            #return redirect(url_for('render_ui', template='main.html'))
            return redirect(url_for('main'))

    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template("login.html", settings=app_settings, user=user)


@app.route('/admin')
def admin():
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template("admin.html", settings=app_settings, user=user)


@app.route('/admin/users')
def admin_users():
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template("users.html", settings=app_settings, user=user)


@app.route('/admin/garments')
def admin_garments():
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template("garments.html", settings=app_settings, user=user)


@app.route('/admin/motifs')
def admin_motifs():
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template("motifs.html", settings=app_settings, user=user)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))


@app.route('/forgotpassword')
def forgotpassword():
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template("forgotpassword.html", settings=app_settings, user=user)


@app.route('/main')
def main():
    # STILL TO DO - IF NOT LOGGED ON THEN REDIRECT TO LOGON SCREEN.
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    tools = services.MyData.get_toolbar()
    return render_template("main.html", settings=app_settings, user=user, tools=tools)


@app.route('/ui/<template>')
def render_ui(template):
    # STILL TO DO - IF NOT LOGGED ON THEN REDIRECT TO LOGON SCREEN.
    app_settings = services.MyData.get_settings()
    user = services.MyData.get_user()
    return render_template(template, settings=app_settings, user=user)


@app.route('/service/settings', methods=['GET'])
def service_settings():
    data = services.MyData.get_settings()
    return jsonify(data=data)


@app.route('/service/set_language/<lang_id>', methods=['POST'])
def service_set_language(lang_id):
    session["language"] = lang_id
    return jsonify(data=lang_id)

@app.route('/service/users', methods=['GET'])
def get_users():
    #data = services.MyData.get_settings()
    data = {'id': '1', 'name': 'Steve'}, {'id': '2', 'name': 'Turton'}

    if data is None:
        abort(404)
    else:
        return jsonify(data=data)


@babel.localeselector
def get_locale():
    # get this out of a table or even a cookie :)
    # return "fr" #request.accept_languages.best_match(settings.LANGUAGES.keys())
    if request.cookies.get('language') is not None:
        lang = request.cookies.get('language')
    else:
        lang = request.accept_languages.best_match(settings.APPLICATION["i18N"]["LANGUAGES"].keys())

    session['language'] = lang

    # maybe just need to return session["language"] now it is initialised in def app_initialise():
    # return lang
    # return session['language']
    return lang

if __name__ == '__main__':
    app.run(host='0.0.0.0')
    #app.run()
