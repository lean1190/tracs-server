/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var moment = require("moment"),
    PatientNoteService = require("../services/PatientNoteService");

var PatientNoteController = {};

PatientNoteController.updatePatientNote= function (req, res) {
    "use strict";
    var updatedNote = req.body;
    var noteId = req.params.id;
    PatientNoteService.updatePatientNote(updatedNote, noteId).then(function (note) {
        res.status(200).jsonp(note);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

module.exports = PatientNoteController;
