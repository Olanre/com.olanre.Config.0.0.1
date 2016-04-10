__author__ = 'IBM'

from qpylib import qpylib
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory, json

from app import app
# set the project root directory as the static folder, you can set others.
#app = Flask(__name__, static_url_path='static')
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_STATIC = os.path.join(APP_ROOT, 'static')

# API end point routes
    
@app.route('/')
def index():
    """
    API GET / or /index end point. 
    Allows getting an index page from app.
    
    @param: None.    
    @return: a HTML home page. 
    @usage: curl -i -u admin:q1d3m0 -k http://localhost:5000/
            curl -i -u admin:q1d3m0 -k http://localhost:5000/index

    """
    return render_template("index.html", 
        console = qpylib.get_console_address())

@app.errorhandler(404)
def not_found_error(error=None, json_output=False):
    if error == None:
        error = "" 
    
    error = str(error)    
    error_title = "404 Page not found Error."
    error_msg = "The administrator has been notified. Sorry for the inconvenience! " + "Error: " + error

    if json_output:
        return json.dumps({'message': error, "details": {}, "description": "", "code": 404, "http_response": {"message":"", "code": 404}}), 404   
    else:
        return render_template('404.html', error_title=error_title, error=error), 404

@app.errorhandler(500)
def internal_error(error=None, json_output=False):
    if error == None:
        error = "" 
    
    error = str(error)    
    error_title = "500 Internal Server Error: An unexpected error has occurred."
    error_msg = "The administrator has been notified. Sorry for the inconvenience! " + "Error: " + error

    if json_output:
        return json.dumps({'message': error, "details": {}, "description": "", "code": 500, "http_response": {"message":"", "code": 500}}), 500
    
    return render_template('500.html', error_title=error_title, error=error), 500 
 
