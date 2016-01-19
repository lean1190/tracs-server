/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */


require("../models/Profile");

var mongoose = require("mongoose"),
    Profile = mongoose.model("Profile"),

    utilsHelper = require("../utils/UtilsHelper");

var ProfileService = {},
    self = ProfileService;



/**
 *  ===============================
 *  ==== BASIC Profile OPERATIONS ====
 *  ===============================
 */

ProfileService.findMyProfiles = function () {
    "use strict";

    // return Profile.find().populate("treatments").exec();
    return Profile.find({'user': "56986b129a1971d812b0050a"}).exec();
};

module.exports = ProfileService;
