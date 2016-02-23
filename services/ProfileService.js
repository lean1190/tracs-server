/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */


require("../models/Profile");
require("../models/Patient");

var mongoose = require("mongoose"),
    Profile = mongoose.model("Profile"),
    Patient = mongoose.model("Patient"),

    utilsHelper = require("../utils/UtilsHelper");

var ProfileService = {},
    self = ProfileService;



/**
 *  ===============================
 *  ==== BASIC Profile OPERATIONS ====
 *  ===============================
 */

ProfileService.findUserProfiles = function (userId) {
    "use strict";

    return Profile.find({'user': userId}).populate('patient').exec();

};

module.exports = ProfileService;
