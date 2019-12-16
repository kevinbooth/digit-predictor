# Web app imports
from flask import Flask, Response, render_template, request, jsonify
import sys 
import os

# Image processing imports
from skimage import transform,io
import numpy as np
import re
import base64
from PIL import Image

# Model imports
from sklearn.neural_network import MLPClassifier
import pickle
import joblib

app = Flask(__name__)
    
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/predict', methods=['GET','POST'])
def predict():
    """
    Predicts what digit was written
    """
    parse_digit(request.get_data())

    img_size = 28, 28 

    image = Image.open('digit.jpg') 
    image = image.resize(img_size, Image.LANCZOS)
    image = image.convert('1') 
    image_array = np.asarray(image)
    image_array = image_array.flatten().reshape(1, -1)

    model = joblib.load('model/model.joblib')
    #model = pickle.load(open('model/model.pkl', 'rb'))
    prediction = model.predict(image_array)
    print("Prediction:", prediction[0])

    return jsonify({'prediction': int(prediction[0])})

def parse_digit(digit_img):
    """
    Parse canvas bytes and save as digit.jpg
    """
    img_str = re.search(b'base64,(.*)', digit_img).group(1)
    with open('digit.jpg','wb') as digit:
        digit.write(base64.decodebytes(img_str))

if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get("PORT", 5500))
    app.run(threaded=False, host='127.0.0.1', port=port)