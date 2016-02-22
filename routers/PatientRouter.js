var express = require("express"),
    router = express.Router(),
    PatientController = require("../controllers/PatientController");

router.get("/", PatientController.find);
router.post("/", PatientController.add);

module.exports = router;
