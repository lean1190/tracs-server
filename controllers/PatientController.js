/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var PatientService = require("../services/PatientService"),
    ProfileService = require("../services/ProfileService");

var PatientController = {};

/**
 * Devuelve todos los perfiles de un usuario pasando su id
 * @param   {object} req {get: id}
 * @param   {object} res
 * @returns {Array}  el arreglo de perfiles de un usuario
 */
PatientController.findUserPatients = function (req, res) {
    "use strict";

    var userId = req.params.id;
    ProfileService.findUserProfiles(userId).then(function (patients) {
        res.status(200).jsonp(patients);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

PatientController.getPatientDetail = function (req, res) {
    "use strict";

    var patientId = req.params.id;

    PatientService.getPatientDetail(patientId).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Crea un nuevo paciente con un usuario administrador asociado
 * @param   {object} req {post: name, dateOfBirth, description, dni, phoneNr, admin}
 * @param   {object} res
 * @returns {object} el paciente creado
 */
PatientController.add = function (req, res) {
    "use strict";

    var newPatient = {
        name: req.body.name,
        birthDate: req.body.birthDate, //"12/12/2012"
        generalDescription: req.body.description, //"description"
        DNI: req.body.dni,
        phoneNumber: req.body.phoneNr
    };

    PatientService.add(newPatient, req.body.admin).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

PatientController.updatePatientDetail = function (req,res){

    console.log("llegue al patient edit");

    //console.log(req.body);
    var updatedPatient = {
        id: req.body._id,
        name: req.body.name,
        birthDate: req.body.birthDate, //"12/12/2012"
        generalDescription: req.body.generalDescription || "", //"description"
        DNI: req.body.DNI || "",
        phoneNumber: req.body.phoneNumber || ""
    };

    console.log(updatedPatient);

    PatientService.updatePatientDetail(updatedPatient).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });

}

module.exports = PatientController;
