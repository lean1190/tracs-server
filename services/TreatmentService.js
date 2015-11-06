/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Treatment");
require("../models/Profile");
require("../models/Patient");

var mongoose = require("mongoose"),
    Treatment = mongoose.model("Treatment");

var TreatmentService = {};

module.exports = TreatmentService;
