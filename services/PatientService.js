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

/**
 *  ===============================
 *  ==== BASIC Patient OPERATIONS ====
 *  ===============================
 */


PatientService.getPatientDetail = function (patientId) {
    "use strict";
    return Patient.find({_id:patientId}).exec();
};


PatientService.add = function(newPatient,adminNr){
    "use strict";
    return newPatient.save(function(err, patient){

        if (err) return console.error(err);

        var newProfile = new Profile();
        newProfile.isAdmin= true;
        newProfile.patient = patient._id;
        newProfile.user = adminNr;

        newProfile.save(function(err, profile){

            if (err) return console.error(err);
            return patient;
        });
   });
};


module.exports = PatientService;
