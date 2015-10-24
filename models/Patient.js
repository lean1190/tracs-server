/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    
    firstName:String,
    lastName:String,
    homeAddress: String,
    diagnoses:[{type : Schema.Types.ObjectId, ref : 'Diagnosis'}]
});

module.exports = mongoose.model("Patient", PatientSchema);

    