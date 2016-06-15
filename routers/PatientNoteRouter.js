/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express"),
    router = express.Router(),
    PatientNoteController = require("../controllers/PatientNoteController");

    router.put("/updatePatientNote/:id", PatientNoteController.updatePatientNote);
    router.delete("/:noteId", PatientNoteController.deleteNote);

module.exports = router;
