/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/User");
require("../models/Treatment");

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    logger = require("../utils/Logger");

var UserService = {};

/**
 * Recupera todos los usuarios
 * @returns {Array} el arreglo con todos los usuarios
 */
UserService.findAll = function () {
    "use strict";

    // return User.find().populate("treatments").exec();
    return User.find().exec();
};

/**
 * Recupera un usuario por el id
 * @param   {number} userId el id del usuario
 * @returns {object} el usuario recuperado
 */
UserService.findById = function (userId) {
    "use strict";

    return User.findById(userId).exec();
};

/**
 * Recupera un usuario por el id de Google
 * @param   {number} googleId el id de Google
 * @returns {object} el usuario recuperado
 */
UserService.findByGoogleId = function (googleId) {
    "use strict";

    return User.find({ googleId: googleId }).exec().then(function (user) {
        return user[0];
    }, function (err) {
        logger.error("Ocurrió un error al buscar al usuario con id de Google " + googleId, err);
        return err;
    });
};

/**
 * Agrega un usuario nuevo
 * @param   {object} reqUser el usuario con los datos básicos
 * @returns {object} el usuario guardado
 */
UserService.addUser = function (reqUser) {
    "use strict";

    reqUser.profiles = reqUser.profiles || [];
    reqUser.about = reqUser.about || "";
    reqUser.phoneNumber = reqUser.phoneNumber || "";
    reqUser.accessToken = reqUser.accessToken || "";
    reqUser.refreshToken = reqUser.refreshToken || "";

    var newUser = new User(reqUser);

    return newUser.save().then(function (user) {
        return user;
    }, function (err) {
        logger.error("Ocurrió un error al guardar al usuario con id de Google " + reqUser.googleId, err);
        return err;
    });
};

/**
 * Actualiza los datos de un usuario
 * @param   {object} reqUser el usuario con los datos a actualizar
 * @returns {object} el usuario actualizado
 */
UserService.updateUser = function (reqUser) {
    "use strict";
    /*return userQuerier.findById(reqUser.id).then(function (user) {
        user.name = reqUser.name || user.name;
        user.phone = reqUser.phone || user.phone;
        user.email = reqUser.email || user.email;
        user.watchRound = reqUser.watchRound || user.watchRound;
        user.schedule = reqUser.schedule || user.schedule;

        return userQuerier.save(user);
    });*/
};

/**
 * Borra un usuario por id
 * @param   {number}  userId el id del usuario a borrar
 * @returns {boolean} true si se guardó correctamente
 */
UserService.deleteUser = function (userId) {
    "use strict";
    return User.findById(userId).then(function (user) {
        User.remove(user).then(function () {
            return true;
        }, function (err) {
            logger.error("Ocurrió un error al borrar al usuario con id " + userId, err);
            return err;
        });
    });
};

/**
 * Borra todos los usuarios de la base
 * ### SOLO PARA USO POR CÓDIGO Y TESTING, SIN CONTROLLER (alto peligro) ###
 */
UserService.deleteAllUsers = function() {
    "use strict";
    User.remove({}, function() {});
};

module.exports = UserService;
