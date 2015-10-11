/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var express = require("express"),
    router = express.Router(),
    passport = require("passport");

router.get("/", function (req, res) {
    "use strict";
    res.status(200).send({"SayHi" : "Hello!"});

    return;
});

router.get("/favicon.ico", function (req, res) {
    "use strict";
    res.status(200);
    res.end();
});

module.exports = router;
