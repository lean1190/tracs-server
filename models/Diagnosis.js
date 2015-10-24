/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var DiagnosisSchema = new Schema({
    
    description: String,
    date: Date,
    treatment: String,
    medication: String,
    inCaseOfEmergency: String
});
    
module.exports = mongoose.model("Diagnosis", DiagnosistSchema);
    