/* jshint bitwise: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, process, module */

// env.json object wrapper :)
var Config = Config || (function () {
    "use strict";

    var env = require("../env.json"),
        node_env = process.env.NODE_ENV || "development";

    return env[node_env];
}());

module.exports = Config;
