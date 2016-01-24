/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Patient");
require("../models/Treatment");
require("../models/Diagnosis");
require("../models/Profile");

var mongoose = require("mongoose"),
    Patient  = mongoose.model("Patient");

var PatientService = {},
    self = PatientService;


PatientService.add = function(req,res){

    console.log("Patient Serv Add");

    var patient = new Patient(req);

        /*Patient.save(newPatient).then(function(err, patient){
            if (err) return console.error(err);
            //newTreatment.patient = patient._id;
            return patient;
        });*/
    patient.save(function(err, patient){
        if (err) return console.error(err);
        //newTreatment.patient = patient._id;
        res.json(patient);

    });
};


module.exports = PatientService;
