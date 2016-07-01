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
        note.title = reqNote.title;
        note.description = reqNote.description;
        return note.save();
    }, function (error) {
        logger.error("No se pudo actualizar la nota " + noteId, error);
        return error;
    });
}

/**
 * Borra todas las notas relacionadas a un perfil determinado
 * @param   {number} profileId id del perfil que esta siendo borrado
 * @returns {promise} una promesa
 */
PatientNoteService.deleteFromProfile = function (profileId){
    "use strict"

    return PatientNote.find({ profile:profileId }).remove().exec();
}

/**
 * Borra una nota determinada
 * @param   {number}  noteId id de la nota a borrar
 * @returns {promesa} una promesa con la nota borrada
 */
PatientNoteService.deleteNote = function (noteId){
    "use strict"

    return PatientNote.find({ _id:noteId }).remove().exec();
}

module.exports = PatientNoteService;
