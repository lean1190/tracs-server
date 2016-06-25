/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var UserService = require("../services/UserService");

var UserController = {};

/**
 * Recupera todos los usuarios
 * @param   {object} req
 * @param   {object} res
 * @returns {Array}  un arreglo con los usuarios
 */
UserController.findAll = function (req, res) {
    "use strict";

    UserService.findAll().then(function (users) {
        res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Recupera un usuario por id
 * @param   {object} req {get: id}
 * @param   {object} res
 * @returns {object} el usuario con id pasado por parametro
 */
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

/**
 * Actualiza un usuario
 * @param   {object} req {get: id}
 * @param   {object} res
 * @returns {object} el usuario actualizado
 */
UserController.updateUser = function (req, res) {
    "use strict";

    var reqUser = {
        _id: req.params.id,
        phoneNumber: req.body.phoneNumber
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


UserController.savePushToken = function (req, res) {
    "use strict";
    UserService.savePushToken(req.body).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

module.exports = UserController;
