/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals module, require */

var Logger = Logger || (function () {
    "use strict";

    var winston = require("winston");
    winston.emitErrs = true;

    return new winston.Logger({
        transports: [
            new winston.transports.File({
                level: "error",
                filename: "./logs/error-logs.log",
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Console({
                level: "debug",
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
}());

module.exports = Logger;
module.exports.stream = {
    write: function (message) {
        "use strict";
        Logger.info(message);
    }
};
