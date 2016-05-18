/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Diagnosis");
require("../models/Medication");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Diagnosis = mongoose.model("Diagnosis"),
    Medication = mongoose.model("Medication");

var DiagnosisService = {};


/**
 * Devuelve la informacion del ultimo diagnostico realizado al paciente
 * @param   {number}  patientId id del paciente del que se quiere buscar su diagnostico
 * @returns {promise} una promesa con la informacion de diagnostico del paciente
 */
DiagnosisService.getDiagnosis = function(diagnosisId){
    "use strict";

    return Diagnosis.findOne({"_id": diagnosisId}).populate("madeBy").exec();

};

DiagnosisService.getDiagnosisMedications = function (diagnosisId) {
    "use strict";

    return Diagnosis.findOne({
            _id: diagnosisId
        },
        "medications -_id").populate("medications").exec();
};

DiagnosisService.addDiagnosisMedications = function (diagnosisId, reqMedication) {
    "use strict";

    var newMedication = new Medication(reqMedication);

    return newMedication.save().then(function (medication) {

        return Diagnosis.findOne({
            _id: diagnosisId
        }).then(function (diagnosis) {
            console.log(diagnosis, diagnosisId);
            diagnosis.medications.push(medication._id);
            return diagnosis.save();

        }, function (error) {
            logger.error("No se pudo recuperar el diagnostico con id " + diagnosisId, error);
            return error;
        });
    }, function (error) {
        logger.error("No se pudo guardar la medicación ", error);
        return error;
    });

};


module.exports = DiagnosisService;
