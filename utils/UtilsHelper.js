/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals module */

// Declare the module
var UtilsHelper = UtilsHelper || (function () {
    "use strict";

    // Create the main object that will be exported
    var trueUtilsHelper = trueUtilsHelper || {};

    // Check if the object has a property, if so returns false
    trueUtilsHelper.isEmptyObject = function (object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    };

    // Check if a variable is empty, null, undefined or blank .
    trueUtilsHelper.isEmpty = function (variable) {
        return (variable === null || typeof variable === "undefined" || variable === "" || variable === {} || trueUtilsHelper.isEmptyObject(variable));
    };

    // Check if the string has the same length passed as parameter
    trueUtilsHelper.hasLength = function (string, length) {
        return (string.length === length);
    };

    return trueUtilsHelper;

}());

module.exports = UtilsHelper;
