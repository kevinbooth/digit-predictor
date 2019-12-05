from flask import Flask, render_template, request
import numpy as np

import sys 
import os

app = Flask(__name__)
    
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/predict/', methods=['GET','POST'])
def predict():
    return render_template("index.html")

if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get("PORT", 5500))
    app.run(host='0.0.0.0', port=port)