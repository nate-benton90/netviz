import os
import json
import random
import secrets

from time import time
from random import random
from flask_dance.contrib.github import make_github_blueprint, github
from flask import Flask, render_template, make_response, url_for, request, redirect

# make sure these keys match throughout code-base (circleci and dockerfile)
github_cs = os.environ['GITHUB_CS']
github_cid = os.environ['GITHUB_CID']

app = Flask(__name__)

# this neccessary in order to provision session tokens for client(s)
secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key

github_blueprint = make_github_blueprint(client_id=github_cid,
                                         client_secret=github_cs)
app.register_blueprint(github_blueprint,
                       url_prefix='/login')

@app.route('/')
def html_page():
    """
    *page for starting oath workflow
    *careful: verify name is same as html file in templates dir.
    """
    return render_template('index.html')

@app.route("/about/")
def about_page():
    """
    *---
    *careful: verify name is same as html file in templates dir.
    """
    return render_template('about.html')

@app.route("/login/oauth/github/")
def github_oauth_page():
    """
    *
    *careful: verify name is same as html file in templates dir.
    """
    return render_template('oath_redirect')

@app.route('/github')
def github_login():
    """
    *OATH login page and redirect to GitHub for auth
    """

    if not github.authorized:
        return redirect(url_for('github.login'))
    else:
        account_info = github.get('/user')
        if account_info.ok:
            account_info_json = account_info.json()
            return '<h1>Your Github name is {}'.format(account_info_json['login'])
    return '<h1>LOGIN FAILED</h1>'


if __name__ == "__main__":
    app.run(host='0.0.0.0',
            port=30000,
            ssl_context='adhoc',
            debug=True)
