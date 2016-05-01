/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/PatientNote");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    PatientNote = mongoose.model("PatientNote");

var PatientNoteService = {};

PatientNoteService.getPatientNote = function(noteId){

    return PatientNote.findOne({_id: noteId}).exec();
};

module.exports = PatientNoteService;
