/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express"),
    router = express.Router(),
    DiagnosisController = require("../controllers/DiagnosisController");

    router.get("/:id", DiagnosisController.getDiagnosisMedications);

    router.put("/addDiagnosisMedication/:id", DiagnosisController.addDiagnosisMedication);

module.exports = router;
