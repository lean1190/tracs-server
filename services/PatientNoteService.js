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

PatientNoteService.updatePatientNote = function (reqNote, noteId){
    "use strict"

    return PatientNote.findOne({_id: noteId}).then(function (note) {

        console.log(note);
        note.title = reqNote.title;
        note.description = reqNote.description;
        return note.save();

    }, function (error) {
        logger.error("No se pudo actualizar la nota " + noteId, error);
        return error;
    });
}

PatientNoteService.deleteFromProfile = function (profileId){

    return PatientNote.find({ profile:profileId }).remove().exec();
}

module.exports = PatientNoteService;
