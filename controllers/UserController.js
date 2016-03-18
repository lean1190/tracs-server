/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var UserService = require("../services/UserService");

var UserController = {};



/**
 *  ===============================
 *  ==== BASIC USER OPERATIONS ====
 *  ===============================
 */

// Return all users

UserController.findAll = function (req, res) {
    "use strict";
    UserService.findAll().then(function (users) {
        res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Return a User with specified ID
UserController.findById = function (req, res) {


    "use strict";
    UserService.findById(req.params.id).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Return a User with specified name
UserController.findByName = function (req, res) {
    "use strict";
    UserService.find({
        name: req.params.name
    }).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Add a new User
UserController.addUser = function (req, res) {
    "use strict";

    var reqUser = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        watchRound: req.body.watchRound,
        schedule: req.body.schedule
    };

    UserService.addUser(reqUser).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Update an existing User
UserController.updateUser = function (req, res) {
    "use strict";

    var reqUser = {
        id: req.params.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };

    UserService.updateUser(reqUser).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Delete a User with specified ID
UserController.deleteUser = function (req, res) {
    "use strict";
    UserService.deleteUser(req.params.id).then(function () {
        res.status(200).jsonp(true);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

module.exports = UserController;
