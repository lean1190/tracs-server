/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var PatientService = require("../services/PatientService");

var ImAPatientController = {};

/**
 * Devuelve todos los perfiles de un usuario pasando su id
 * @param   {object} req {get: id}
 * @param   {object} res
 * @returns {Array}  el arreglo de perfiles de un usuario
 */
ImAPatientController.findByDni = function (req, res) {
    "use strict";

    var patientDni = req.params.dni;

    PatientService.findByDni(patientDni).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Agrega una alerta georeferenciada hecha por el paciente
 * @param   {object}   req [[Description]]
 * @param   {object} res
 * @returns {object} El paciente actualizado con su alerta
 */
ImAPatientController.addGeoAlert = function (req, res) {
    "use strict";

    var patientId = req.params.id;
    var geoAlert = req.body;

    console.log(req.body);


    PatientService.addGeoAlert(patientId,geoAlert).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

module.exports = ImAPatientController;
