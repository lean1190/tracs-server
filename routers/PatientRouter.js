/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");



router.get("/:id", PatientController.findUserPatients);
router.get("/detail/:id", PatientController.getPatientDetail);

router.get("/user/:id", PatientController.findUserPatients);


router.post("/", PatientController.add);

module.exports = router;
