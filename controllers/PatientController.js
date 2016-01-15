/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/
/* globals require, module, console */

var PatientService = require("../services/PatientService");


require("../models/Patient");
require("../models/Profile");


var PatientController = {},
	mongoose = require("mongoose"),
	Patient  = mongoose.model("Patient"),
    Profile = mongoose.model("Profile");



/**
 *  ===============================
 *  ==== BASIC Treatment OPERATIONS ====
 *  ===============================
 */

PatientController.add = function (req, res) {
"use strict";

    console.log("Patient Controller");

    //var newPatient = new Patient();
    var newPatient = new Patient();

    newPatient.name = "Nombre"//req.patientName;
    newPatient.birthDate = "12/12/2012"//req.patientBirthDate;
    newPatient.description = "description"//req.patientDescription;
    newPatient.DNI = "35792525";


    /*PatientService.add(newPatient).then(function(patient){
        res.jsonp(patient);
    }, function(err){
        return res.status(500).send(err.message);
    });*/

//El tratamiento tendria que tener asignado al usuario en el modelo. Ahora no se si el Perfil tambien tiene que tener asignado al usuario, no se, como que siento que falta una pata para especificar el perfil del usuario.

    newPatient.save(function(err, patient){

        if (err) return console.error(err);

        var newProfile = new Profile();
        newProfile.isAdmin= true;
        newProfile.patient = patient._id;
        newProfile.user = patient._id; //LO GUARDA CON EL DEL PACIENTE POR EL MOMENTO, HASTA TENER EL DEL USUARIO


        newProfile.save(function(err, profile){

            if (err) return console.error(err);
            res.jsonp(patient)



        });

       /* if (err) return console.error(err);
        //newTreatment.patient = patient._id;

        res.jsonp(patient);*/
    });


    /* PatientService.add(function(err, patient){
        if (err) return console.error(err);
        //newTreatment.patient = patient._id;
        res.jsonp(patient);
    });*/

};




module.exports = PatientController;
