/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var UserService = require("./UserService"),
    utilsHelper = require("../utils/UtilsHelper"),
    logger = require("../utils/Logger");

var SessionService = {};

/**
 * Busca un usuario por el id de Google, si no lo encuentra
 * crea uno nuevo. Devuelve un usuario con todos los datos
 * @param {object} reqUser el usuario con los datos básicos del perfil de Google
 */
SessionService.findOrCreateUser = function (reqUser) {
    "use strict";

    //UserService.deleteAllUsers();

    return UserService.findByGoogleId(reqUser.googleId).then(function (foundUser) {
        // Si no se encontró el usuario
        if (utilsHelper.isEmpty(foundUser)) {
            logger.info("No se encontró el usuario con id de Google " + reqUser.googleId + ", se crea uno nuevo");
            return UserService.addUser(reqUser).then(function (user) {
                return user;
            });
        } else {
            return foundUser;
        }
    });
};

module.exports = SessionService;
