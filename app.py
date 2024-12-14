# app.py
from flask import Flask, render_template, request, redirect, url_for, session
from flask_babel import Babel
from flask_babel import gettext as _
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) #Нужно для работы сессий

# Настройка Babel для мультиязычности
app.config['BABEL_DEFAULT_LOCALE'] = 'ru'
app.config['BABEL_SUPPORTED_LOCALES'] = ['ru', 'en']
babel = Babel(app)

def get_locale():
    if 'lang' in session:
        return session['lang']
    return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])

babel.init_app(app, locale_selector=get_locale)

@app.context_processor
def inject_get_locale():
    return {'get_locale': get_locale}

@app.route('/set_language/<language>')
def set_language(language):
    if language not in app.config['BABEL_SUPPORTED_LOCALES']:
        language = 'ru'
    session['lang'] = language
    return redirect(request.referrer or url_for('main'))

@app.route("/")
def main():
    return render_template("index.html")

@app.errorhandler(404)
def render_not_found(error):
    return render_template("404.html"), 404

@app.errorhandler(500)
def render_server_error(error):
    return render_template("500.html"), 500

if __name__ == '__main__':
    app.run(port=5002, debug=True)