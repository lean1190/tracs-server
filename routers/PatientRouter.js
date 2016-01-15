var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");

/* Basic Patient information */
console.log("vino al PatienttRouter");
//router.get("/", PatientController.findAll);
router.post("/", PatientController.add);

module.exports = router;
