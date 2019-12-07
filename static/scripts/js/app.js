/******************************************************************************
*
*   Name: digit-recognition
*   Version: 1.0
*   Author: Kevin Booth
*   Dependencies:
*
******************************************************************************/

/**
 * DR Digit Reader
 * @namespace
 */
var DR = window.DR || {
    canvas: '',
    context: '',
    mouse: '',
    prevMouse: '',
    prediction: ''
};

/**
 * Checks if DOM is ready for JS to fire
 * @function
 * @param {object} _fn init function to run once DOM is ready
 */
DR.ready = function (_fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        _fn();
    } else {
        document.addEventListener('DOMContentLoaded', _fn);
    }
};

/**
 * Fires off all functions on page load
 * @function
 */
DR.init = function () {
    DR.initDrawing();

    const btnPredict = document.querySelector("#predict");
    const btnClear = document.querySelector("#clear");

    btnPredict.addEventListener('click', function() {
        DR.predict();
    });

    btnClear.addEventListener('click', function() {
        DR.clear();
    });
};

/**
 * Initiates the drawing functionality within the canvas
 * @function
 */
DR.initDrawing = function () {
    /* Setup variables and configurations */
    DR.canvas = document.querySelector("#canvas");
    DR.context = canvas.getContext("2d");
    DR.canvas.width = 280;
    DR.canvas.height = 280;
    DR.mouse = {
        x: 0, 
        y: 0
    };
    DR.prevMouse = {
        x: 0, 
        y: 0
    };
    DR.context.fillStyle = "black";
	DR.context.fillRect(0, 0, DR.canvas.width, DR.canvas.height);
	DR.context.color = "white";
	DR.context.lineWidth = 10;
    DR.context.lineJoin = DR.context.lineCap = 'round';

	DR.canvas.addEventListener("mousemove", function(e) {
		DR.prevMouse.x = DR.mouse.x;
		DR.prevMouse.y = DR.mouse.y;

		DR.mouse.x = e.pageX - this.offsetLeft;
		DR.mouse.y = e.pageY - this.offsetTop;
	}, false);

	DR.canvas.addEventListener("mousedown", function(e) {
		DR.canvas.addEventListener("mousemove", DR.draw, false);
	}, false);

	DR.canvas.addEventListener("mouseup", function() {
		DR.canvas.removeEventListener("mousemove", DR.draw, false);
    }, false);
};

/**
 * Draws a line where cursor moves to within canvas
 * @function
 */
DR.draw = function () {
    DR.context.lineWidth = DR.context.lineWidth;
    DR.context.lineJoin = "round";
    DR.context.lineCap = "round";
    DR.context.strokeStyle = DR.context.color;

    DR.context.beginPath();
    DR.context.moveTo(DR.prevMouse.x, DR.prevMouse.y);
    DR.context.lineTo(DR.mouse.x, DR.mouse.y );
    DR.context.closePath();
    DR.context.stroke();
};

/**
 * Clears the canvas
 * @function
 */
DR.clear = function () {
    const result = document.querySelector("#result");
    result.innerHTML = '';

    DR.context.clearRect( 0, 0, 280, 280 );
    DR.context.fillStyle="black";
    DR.context.fillRect(0,0,canvas.width,canvas.height);
};

/**
 * Sends asynchronous call back to server to predict what digit was drawn
 * @function
 */
DR.predict = function () {
    const digit = DR.canvas.toDataURL('image/jpg');
    const result = document.querySelector("#result");

    fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(digit)
    }).then(function (response) {
        response.json().then(function (data) {
            DR.prediction = data.prediction;
            result.innerHTML = "Result: " + DR.prediction;
        });
    }).catch(function (reason) {
        result.innerHTML = "Something went wrong.";
    });
};

/**
 * Invoke ready function
 */
DR.ready(DR.init);
