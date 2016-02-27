/* globals require, module */

var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");

router.get("/:id", PatientController.findUserPatients);
router.get("/detail/:id", PatientController.getPatientDetail);
router.post("/", PatientController.add);

module.exports = router;
