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
var DR = window.DR || {};

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

};

/**
 * Invoke ready function
 */
DR.ready(DR.init);