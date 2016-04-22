/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DiagnosisSchema = new Schema({

    roomId: { type: String, required: true },
    messages:[{

            userName: { type: String, required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, required: true }

    }]

});
