/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    
    description: String,
    isAdmin: Boolean,
    notes:[{type : Schema.Types.ObjectId, ref : 'Note'}],
    notifications:[{type : Schema.Types.ObjectId, ref : 'Notification'}],
    reports:[{type : Schema.Types.ObjectId, ref : 'Report'}],
    accessRoles:[{type : Schema.Types.objectId, ref: 'AccessRole'}]
    //chats:
});

module.exports = mongoose.model("Patient", PatientSchema);
    