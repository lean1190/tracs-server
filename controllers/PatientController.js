/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/
/* globals require, module, console */

//var PatientService = require("../services/PatientService");

require("../models/Patient");

var PatientController = {},
	mongoose = require("mongoose"),
	Patient  = mongoose.model("Patient");
/**
 *  ===============================
 *  ==== BASIC Treatment OPERATIONS ====
 *  ===============================
 */

PatientController.addPatient = function (req, res) {
"use strict";

    var newPatient = new Patient();

    newPatient.name = "Nombre"//req.patientName;
    newPatient.birthDate = "12/12/2012"//req.patientBirthDate;
    newPatient.description = "description"//req.patientDescription;
    newPatient.DNI = "35792525";

//El tratamiento tendria que tener asignado al usuario en el modelo. Ahora no se si el Perfil tambien tiene que tener asignado al usuario, no se, como que siento que falta una pata para especificar el perfil del usuario.

    newPatient.save(function(err, patient){
        if (err) return console.error(err);
        //newTreatment.patient = patient._id;
        res.json(patient);
    });

};




module.exports = PatientController;
