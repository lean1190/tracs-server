/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Patient");
require("../models/Treatment");
require("../models/Diagnosis");
require("../models/Profile");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Patient = mongoose.model("Patient"),
    ProfileService = require("./ProfileService");

var PatientService = {};

PatientService.getPatientDetail = function (patientId) {
    "use strict";
    return Patient.find({_id:patientId}).exec();
};


/**
 * Agrega un paciente nuevo y le asocia un perfil administrador
 * @param   {object}  reqPatient  el paciente con los datos básicos
 * @param   {number}  adminUserId el id del usuario administrador del nuevo paciente
 * @returns {promise} una promesa con el paciente creado
 */

PatientService.add = function (reqPatient, adminUserId) {
    "use strict";

    // Setea valores por defecto a los parámetros que no son obligatorios
    reqPatient.generalDescription = reqPatient.generalDescription || "";
    reqPatient.phoneNumber = reqPatient.phoneNumber || "";
    reqPatient.picture = reqPatient.picture || "https://en.opensuse.org/images/0/0b/Icon-user.png";

    // Crea un modelo a partir del objeto del request

    var newPatient = new Patient(reqPatient);

    return newPatient.save().then(function (patient) {
        var newProfile = {
            isAdmin: true,
            patient: patient._id,
            user: adminUserId
        };

        ProfileService.add(newProfile).catch(function (error) {
            logger.error("No se pudo guardar el profile para el paciente con id " + patient._id, error);

        });
    }, function (error) {
        logger.error("No se pudo guardar el paciente con id " + newPatient._id, error);
    });
};


module.exports = PatientService;
