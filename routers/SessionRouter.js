/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, module, console */

var express = require("express"),
    router = express.Router();

router.get("/login", function (req, res) {
    "use strict";
    console.log("Server google id", req.params.googleId);
    res.status(200).jsonp(true);
});

router.get("/logout", function (req, res) {
    "use strict";
    req.logout();
    res.redirect("/");
});

module.exports = router;
