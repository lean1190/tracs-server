/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/User");
require("../models/Treatment");

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    utilsHelper = require("../utils/UtilsHelper");

var UserService = {},
    self = UserService;

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
    console.log("$$$$ Llego hasta el UserService.findByGoogleId", googleId);
    return User.find({ googleId: googleId }).exec();
};

/**
 * Agrega un usuario nuevo
 * @param   {object} reqUser el usuario con los datos básicos
 * @returns {object} el usuario guardado
 */
UserService.addUser = function (reqUser) {
    "use strict";
    console.log("$$$$ Llego hasta el UserService.addUser", reqUser);
    reqUser.profiles = [];
    var newUser = new User(reqUser);

    console.log("$$$$ Usuario del modelo", newUser);

    return User.save(newUser).then(function (user) {
        console.log("$$$$ Se guardo okey", user);
        return user;
    }, function (err) {
        console.log("$$$$ Se rompio", err);
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
    return userQuerier.findById(reqUser.id).then(function (user) {
        user.name = reqUser.name || user.name;
        user.phone = reqUser.phone || user.phone;
        user.email = reqUser.email || user.email;
        user.watchRound = reqUser.watchRound || user.watchRound;
        user.schedule = reqUser.schedule || user.schedule;

        return userQuerier.save(user);
    });
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
            return err;
        });
    });
};

module.exports = UserService;
