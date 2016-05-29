/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Diagnosis");
require("../models/Medication");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Diagnosis = mongoose.model("Diagnosis"),
    Medication = mongoose.model("Medication"),
    MedicationService = require("./MedicationService"),
    Patient = mongoose.model("Patient"),
    NotificationsService = require("./NotificationsService");

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

/**
 * Devuelve las medicaciones relacionadas a un diagnostico
 * @param   {number}  diagnosisId id del diagnostico que tienen las medicaciones  a buscar
 * @returns {promise} una promesa con las medicaciones encontradas
 */
DiagnosisService.getDiagnosisMedications = function (diagnosisId) {
    "use strict";

    return Diagnosis.findOne({
            _id: diagnosisId
        },
        "medications -_id").populate("medications").exec();
};

/**
 * Agrega medicaciones al diagnostico
 * @param   {number}  diagnosisId   id del diagnostico al que se le van a agregar medicaciones
 * @param   {object}  reqMedication medicacion que va a ser agregada
 * @returns {promise} una promesa con el diagnostico modificado
 */
DiagnosisService.addDiagnosisMedications = function (diagnosisId, reqMedication) {
    "use strict";

    var newMedication = new Medication(reqMedication);

    return MedicationService.addMedication(newMedication).then(function(medication){
        return Diagnosis.findOne({
            _id: diagnosisId
        }).then(function (diagnosis) {

            diagnosis.medications.push(medication._id);
            diagnosis.save();
            return NotificationsService.createNotificationForPatientId(diagnosis.patient, "Se ha modificado la medicación", "patient.medication.updated");

        }, function (error) {
            logger.error("No se pudo recuperar el diagnostico con id " + diagnosisId, error);
            return error;
        });
    }, function (error) {
        logger.error("No se pudo guardar la medicación ", error);
        return error;
    });

};

DiagnosisService.updateDiagnosis = function (diagnosisId, reqDiagnosis){
    "use strict";

    return Diagnosis.findOne({_id: diagnosisId}).then(function (diagnosis) {

        diagnosis.name = reqDiagnosis.name;
        diagnosis.description = reqDiagnosis.description;
        diagnosis.save();

        return NotificationsService.createNotificationForPatientId(diagnosis.patient, "Se ha modificado el diagnóstico", "patient.diagnosis.updated");

    }, function (error) {
        logger.error("No se pudo actualizar el diagnostico " + diagnosisId, error);
        return error;
    });
}


module.exports = DiagnosisService;
