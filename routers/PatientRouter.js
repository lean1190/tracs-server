var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");

<<<<<<< HEAD
/* Basic Patient information */
console.log("vino al PatienttRouter");
router.get("/:id", PatientController.findUserPatients);
=======
router.get("/", PatientController.find);
>>>>>>> origin/development
router.post("/", PatientController.add);

module.exports = router;
