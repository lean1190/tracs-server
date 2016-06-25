/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express"),
    router = express.Router(),
    UserController = require("../controllers/UserController");

router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);

router.post("/", UserController.addUser);

router.put("/:id", UserController.updateUser);
router.put("/save/push", UserController.savePushToken);

router.delete("/:id", UserController.deleteUser);

/*router.get("/name/:name", UserController.findByName);*/


module.exports = router;
