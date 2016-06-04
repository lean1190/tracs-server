/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/
/* globals require, module, console */

var TreatmentService = require("../services/TreatmentService");

require("../models/Treatment");

var TreatmentController = {},
	mongoose = require("mongoose"),
	Treatment = mongoose.model("Treatment");
/**
 *  ===============================
 *  ==== BASIC Treatment OPERATIONS ====
 *  ===============================
 */

// Add a new Treatment
TreatmentController.addTreatment = function (req, res) {
    "use strict";

    Treatment = mongoose.model("Treatment");
    var newTreatment = new Treatment();
    newTreatment.description = "asdasdasdasd";
    res.json(newTreatment);

 /*   TreatmentService.addTreatment(req).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });*/



};

module.exports = TreatmentController;
