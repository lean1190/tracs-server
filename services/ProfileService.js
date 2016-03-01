/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Profile");
require("../models/Patient");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Profile = mongoose.model("Profile");

var ProfileService = {};

/**
 * Devuelve todos los perfiles de un usuario
 * @param   {number}  userId el id del usuario para buscar los perfiles
 * @returns {promise} una promesa con los perfiles disponibles del usuario
 */
ProfileService.findUserProfiles = function (userId) {
    "use strict";

    return Profile.find({"user": userId}).populate("patient").exec();
};

/**
 * Crea un nuevo perfil
 * @param   {object}  reqProfile el perfil con los datos básicos
 * @returns {promise} una promesa con el perfil creado
 */
ProfileService.add = function(reqProfile) {
    "use strict";

    console.log("llegue al profile service");
    var newProfile = new Profile(reqProfile);

    return newProfile.save().then(null, function (error) {
        logger.error("No se pudo guardar el profile", error);
        return error;
    });

};

module.exports = ProfileService;
