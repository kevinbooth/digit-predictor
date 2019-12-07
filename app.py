from flask import Flask, render_template, request, jsonify
from skimage import transform,io
import numpy as np
import re
import base64
import pickle
import joblib
from sklearn.neural_network import MLPClassifier
from PIL import Image

import sys 
import os

app = Flask(__name__)
    
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/predict', methods=['GET','POST'])
def predict():
    # read parsed image back in 8-bit, black and white mode (L)
    #x = io.imread('digit.jpg', as_gray=True)
    #x = np.invert(x)
    #x = transform.resize(x, (28, 28))
    #io.imsave('digit_sm.jpg', x)
    #reshape image data for use in neural network
    #x = x.reshape(1, 784).astype('float32')
    # x /= 255
    #io.imsave('digit_final.jpg', x)

    #requests image from url 
    parseDigit(request.get_data())

    img_size = 28, 28 

    image = Image.open('digit.jpg') 
    image = image.resize(img_size, Image.NEAREST)
    image = image.convert('1') 
    image_array = np.asarray(image)
    image_array = image_array.flatten().reshape(1, -1)

    model = joblib.load('model/model.joblib')
    #model = pickle.load(open('model/model.pkl', 'rb'))
    prediction = model.predict(image_array)
    print("Prediction:", prediction)

    return jsonify({'prediction': 5})

def parseDigit(digitImg):
    # parse canvas bytes and save as digit.png
    imgstr = re.search(b'base64,(.*)', digitImg).group(1)
    with open('digit.jpg','wb') as digit:
        digit.write(base64.decodebytes(imgstr))

if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get("PORT", 5500))
    app.run(threaded=False, host='127.0.0.1', port=port)