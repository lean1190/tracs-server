var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");

router.get("/:id", PatientController.findUserPatients);
router.post("/", PatientController.add);

module.exports = router;
