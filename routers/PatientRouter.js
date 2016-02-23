var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");

/* Basic Patient information */
console.log("vino al PatienttRouter");
router.get("/:id", PatientController.findUserPatients);
router.post("/", PatientController.add);

module.exports = router;
