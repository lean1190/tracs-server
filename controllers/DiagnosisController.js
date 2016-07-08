/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var moment = require("moment"),
    DiagnosisService = require("../services/DiagnosisService"),
    MedicationService = require("../services/MedicationService");

var DiagnosisController = {};


DiagnosisController.getDiagnosis = function (req, res) {
    "use strict";

    var diagnosisId = req.params.id;

    DiagnosisService.getDiagnosis(diagnosisId).then(function (diagnosis) {;
        res.status(200).jsonp(diagnosis);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

DiagnosisController.getDiagnosisMedications = function (req, res) {
    "use strict";

    var diagnosisId = req.params.id;
    MedicationService.getDiagnosisMedications(diagnosisId).then(function (medications) {
        res.status(200).jsonp(medications);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

DiagnosisController.updateDiagnosis = function (req, res){
    "use strict";

    var diagnosisId = req.params.id;
    var updatedDiagnosis = req.body;

    DiagnosisService.updateDiagnosis(diagnosisId, updatedDiagnosis).then(function(diagnosis) {

        res.status(200).jsonp(diagnosis);

    }, function (err) {
        return res.status(500).send(err.message);
    });
};


DiagnosisController.addDiagnosisMedication = function (req, res){
    "use strict";

    var diagnosisId = req.params.id;
    var newMedication = req.body;

    DiagnosisService.addDiagnosisMedications(diagnosisId, newMedication).then(function(medication) {
        res.status(200).jsonp(medication);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

DiagnosisController.deleteDiagnosisMedication = function(req, res){
    "use strict";

    var diagnosisId = req.params.diagnosisId;
    var medicationId = req.params.medicationId;

    DiagnosisService.deleteDiagnosisMedication(diagnosisId, medicationId).then(function(medication) {
        res.status(200).jsonp(medication);
    }, function (err) {
        return res.status(500).send(err.message);
    });

};

module.exports = DiagnosisController;
