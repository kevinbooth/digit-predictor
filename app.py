from flask import Flask, render_template, request
from skimage import transform,io
from PIL import Image
import numpy as np
import re
import base64
from tensorflow.keras.models import load_model
import tensorflow.keras.models

import sys 
import os

app = Flask(__name__)
    
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/predict', methods=['GET','POST'])
def predict():
    parseDigit(request.get_data())

    # read parsed image back in 8-bit, black and white mode (L)
    x = io.imread('digit.png', as_gray=True)
    #x = np.invert(x)
    x = transform.resize(x, (28, 28)).astype('float32')
    io.imsave('digit_sm.png', x)
    #reshape image data for use in neural network
    x = x.reshape(1, 784)

    model = load_model("model/model_ann.h5")
    prediction = model.predict(x)
    print("Prediction:", prediction)

    return str(prediction)

def parseDigit(digitImg):
    # parse canvas bytes and save as digit.png
    imgstr = re.search(b'base64,(.*)', digitImg).group(1)
    with open('digit.png','wb') as digit:
        digit.write(base64.decodebytes(imgstr))

if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get("PORT", 5500))
    app.run(threaded=False, host='127.0.0.1', port=port)