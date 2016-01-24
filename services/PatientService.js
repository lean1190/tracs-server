/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Patient");
require("../models/Treatment");
require("../models/Diagnosis");
require("../models/Profile");

var mongoose = require("mongoose"),
    Patient  = mongoose.model("Patient");
    Profile = mongoose.model("Profile");

var PatientService = {},
    self = PatientService;


PatientService.add = function(newPatient){
    "use strict";
    console.log("Patient Serv Add");

    //var patient = new Patient(req);

        /*Patient.save(newPatient).then(function(err, patient){
            if (err) return console.error(err);
            //newTreatment.patient = patient._id;
            return patient;
        });*/

    //return User.save(newUser).then(function (user) {
    return newPatient.save(function(err, patient){

        if (err) return console.error(err);

        var newProfile = new Profile();
        newProfile.isAdmin= true;
        newProfile.patient = patient._id;
        newProfile.user = "56986b129a1971d812b0050a"; //LO GUARDA CON un hardcode por el momento, hasta que podamos guardar el ID en el localstorage


        newProfile.save(function(err, profile){

            if (err) return console.error(err);
            return patient;



        });
   });
};


module.exports = PatientService;
