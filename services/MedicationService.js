/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Medication");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Medication = mongoose.model("Medication");

var MedicationService = {};

/**
 * Se agrega una nueva medicacion al diagnostico del paciente
 * @param   {object}  newMedication informacion de la medicacion a agregar
 * @returns {promise} una promesa con la medicacion que fue agregada
 */

MedicationService.addMedication = function(newMedication){
    "use strict";

    return newMedication.save().then(function(medication){
        return medication;
    }, function(error){
        logger.error("No se pudo guardar la nueva medicacion", error);
    });

};

MedicationService.deleteMedication = function(medicationId){
    "use strict";

    return Medication.find({ _id: medicationId }).remove().exec();
}


module.exports = MedicationService;
