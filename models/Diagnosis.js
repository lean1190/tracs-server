/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DiagnosisSchema = new Schema({
    
    description: { type: String, required: true },
    date: { type: Date, required: true },
    treatment: String,
    inCaseOfCrisis: String,
    medications: [{type : Schema.Types.ObjectId, ref : "Medication"}]

});
    
module.exports = mongoose.model("Diagnosis", DiagnosisSchema);
