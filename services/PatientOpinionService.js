/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/PatientOpinion");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    PatientOpinion = mongoose.model("PatientOpinion");

var PatientOpinionService = {};

PatientOpinionService.addOpinion = function(newOpinion){
    "use strict";

    return newOpinion.save().then(function(opinion){
        return opinion;
    }, function(error){
        logger.error("No se pudo guardar la nueva opinion sobre el paciente", error);
    });

};

PatientOpinionService.deleteFromProfile = function (profileId){

    return PatientOpinion.find({ profile:profileId }).remove().exec();
}

module.exports = PatientOpinionService;
