/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var SessionService = require("../services/SessionService"),
    SessionController = {};

SessionController.login = function (req, res) {
    "use strict";
    var reqUser = {};

    reqUser.accessToken = req.query.accessToken;
    reqUser.refreshToken = req.query.refreshToken;
    reqUser.googleId = req.query.googleId;
    reqUser.email = req.query.googleId;
    reqUser.name = req.query.name;
    reqUser.picture = req.query.picture;

    SessionService.findOrCreateUser(reqUser).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

module.exports = SessionController;
