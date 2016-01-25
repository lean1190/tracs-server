/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, module, console */

var express = require("express"),
    router = express.Router(),
    SessionController = require("../controllers/SessionController");

router.get("/login", SessionController.login);

module.exports = router;
