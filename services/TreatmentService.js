/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Treatment");
require("../models/Profile");
require("../models/Patient");

var mongoose = require("mongoose"),
    Treatment = mongoose.model("Treatment");

var TreatmentService = {},
    self = TreatmentService;

UserService.addTreatment = function (req) {

    "use strict";
    var newTreatment = new Treatment();
    var newPatient = new Patient();

    newPatient.name = req.patientName;
    newPatient.birthDate = req.patientBirthDate;
    newPatient.description = req.patientDescription;

//El tratamiento tendria que tener asignado al usuario en el modelo. Ahora no se si el Perfil tambien tiene que tener asignado al usuario, no se, como que siento que falta una pata para especificar el perfil del usuario.

    newTreatment.description = req.description;

    newPatient.save(function(err, patient){
        if (err) return console.error(err);
        newTreatment.patient = patient._id;
        return User.save(newUser).then(function (user) {
            return user;
        }, function (err) {
            return err;
        });
    });
};

module.exports = TreatmentService;
