/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    
    name: { type: String, required: true },
    DNI: {type: String, required:true},
    homeAddress: String,
    birthDate: Date,
    picture: String,
    description: String,
    phoneNumber: String,
    diagnoses:[{type : Schema.Types.ObjectId, ref : "Diagnosis"}]

});

/*PatientSchema.prototype.getPatients = function(){

    PatientSchema.find().populate('diagnoses').exec()
};*/

module.exports = mongoose.model("Patient", PatientSchema);

