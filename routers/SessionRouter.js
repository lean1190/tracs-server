/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, module, console */

var express = require("express"),
    router = express.Router(),
    passport = require("passport");

/**
 * Use passport.authenticate() as route middleware to authenticate the
 * request.  The first step in Google authentication will involve
 * redirecting the user to google.com.  After authorization, Google
 * will redirect the user back to this application at the callback route
 */
router.get("/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"
        ]
    }),
    function (req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.

        "use strict";
        console.log("whoops! Google login endpoint failed");
    }
);

/**
 * Use passport.authenticate() as route middleware to authenticate the
 * request.  If authentication fails, the user will be redirected back to the
 * login page.  Otherwise, the primary route function function will be called,
 * which, in this example, will redirect the user to the home page.
 */
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (req, res) {
    "use strict";
    res.status(200).jsonp(true);
});

router.get("/logout", function (req, res) {
    "use strict";
    req.logout();
    res.redirect("/");
});

module.exports = router;
