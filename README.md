# Digit Recognition Web Application Tool
Handwritten digit recognition web application that utilizes the MNIST dataset

## Local development steps

* Clone repository locally
* Create your virtual environment
```
python3 -m venv /path/to/new/virtual/environment
```
* Start virtual environment
```
source /path/to/new/virtual/environment/bin/activate
```
* Configure your virtual environment with file included in repo
```
pip install -r requirements.txt
```
* Start server
```
python app.py
```

## Technology

### Web App:
* Flask
* Grunt.js Frontend Build Processing
* Vanilla JS
* SCSS

### ML Model:
* Multi-layer Perceptron Neural Network 
  * scikit-learn
* Joblib/Pickle Serialization

### Dataset:
* MNIST