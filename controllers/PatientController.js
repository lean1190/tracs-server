/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/
/* globals require, module, console */

var PatientService = require("../services/PatientService");
var ProfileService = require("../services/ProfileService");


require("../models/Patient");
require("../models/Profile");


var PatientController = {},
	mongoose = require("mongoose"),
	Patient  = mongoose.model("Patient"),
    Profile = mongoose.model("Profile");

/**
 *  ===============================
 *  ==== BASIC Patient OPERATIONS ====
 *  ===============================
 */


PatientController.findUserPatients = function (req, res) {
"use strict";

    console.log(req.params.id);
    var userId = req.params.id;

    ProfileService.findUserProfiles(userId).then(function (patients) {
        console.log(patients);
        res.status(200).jsonp(patients);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};


PatientController.add = function (req, res) {
"use strict";

    console.log("Patient Controller");

    console.log(req.body);
    //var newPatient = new Patient();
    var newPatient = new Patient();

    newPatient.name = req.body.name;//req.patientName;
    newPatient.birthDate = req.body.dateOfBirth;//"12/12/2012"
    newPatient.generalDescription = req.body.description;//"description"
    newPatient.DNI = req.body.dni;
    newPatient.phoneNumber = req.body.phoneNr;
    newPatient.picture = "https://en.opensuse.org/images/0/0b/Icon-user.png";
    console.log(newPatient);
    PatientService.add(newPatient,req.body.admin).then(function(patient){
        res.jsonp(patient);
    }, function(err){
        return res.status(500).send(err.message);
    });

//El tratamiento tendria que tener asignado al usuario en el modelo. Ahora no se si el Perfil tambien tiene que tener asignado al usuario, no se, como que siento que falta una pata para especificar el perfil del usuario.

};

module.exports = PatientController;
