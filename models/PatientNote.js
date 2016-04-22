/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PatientNoteSchema = new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    tags: [String],
    //isComplex: { type:Boolean, required: true},
    attachmentFiles:[{type : Schema.Types.ObjectId, ref : 'AttachmentFile'}]

});

module.exports = mongoose.model("PatientNote", PatientNoteSchema);


