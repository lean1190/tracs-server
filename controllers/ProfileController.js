/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var ProfileService = require("../services/ProfileService");

var ProfileController = {};


/**
 *  ===============================
 *  ==== BASIC Profile OPERATIONS ====
 *  ===============================
 */

// Return all users
ProfileController.findUserProfiles = function (req, res) {
    "use strict";
    ProfileService.findMyProfiles().then(function (profiles) {
        res.status(200).jsonp(profiles);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

ProfileController.getProfile = function (req, res) {
    "use strict";

    ProfileService.getProfile(req.params.idPatient, req.params.idUser).then(function (profile) {
        res.status(200).jsonp(profile);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};


ProfileController.removeProfile = function(req,res){

    var userId = req.params.idUser;
    var patientId = req.params.idPatient;

    //var profileId = req.params.idProfile;


    ProfileService.removeProfile(patientId, userId/*patientId,profileId*/).then(function(deletedProfile){
        res.status(200).jsonp(deletedProfile);
    }, function (err) {
        return res.status(500).send(err.message);
    });

}

// Return a User with specified ID

module.exports = ProfileController;
