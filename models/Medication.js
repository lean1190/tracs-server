/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MedicationSchema = new Schema({

    drug: { type: String, required: true },
    dosis: { type: String, required: true },
    frequence: { type: String, required: true },
    reminders: [
        {
            interval: int
        }
    ]

});

module.exports = mongoose.model("Medication", MedicationSchema);
