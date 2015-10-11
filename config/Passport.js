/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, module, require */

var session = require("express-session"),
    passport = require("passport"),
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    UserService = require("../services/UserService");

/**
 * Configure a passport instance with the Google Strategy
 *
 * @param settings an object with the passport configurations
 * e.g. { sessionSecret: "key", googleClientId: "10166.apps.google.com", googleClientSecret: "X3iM38L", authCallbackUrl: "http://127.0.0.1:3000/auth/google/callback" }
 */
var passportConfigured = function Passport(settings) {
    "use strict";

    this.settings = settings;

    /**
     * Initialize the app with the required passport configuration
     *
     * @param app an express application
     */
    this.register = function (app) {

        // Session config
        app.use(session({
            secret: this.settings.sessionSecret,
            resave: false,
            saveUninitialized: false
        }));

        // Passport session setup.
        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(function (id, done) {
            UserService.findById( id, function (err, user) {
                done(err, user);
            });
        });

        // Use the GoogleStrategy within Passport.
        passport.use(new GoogleStrategy({
                clientID: this.settings.googleClientId,
                clientSecret: this.settings.googleClientSecret,
                callbackURL: this.settings.authCallbackUrl
            },
            function (accessToken, refreshToken, googleProfile, done) {
                UserService.findOrCreateUserWithGoogleProfile(googleProfile, accessToken, refreshToken).then(function (user) {
                    return done(null, user);
                },
                function(err) {
                    console.log("wtf happened?!", err);
                });
            }
        ));

        // Initialize Passport!  Also use passport.session() middleware, to support
        // persistent login sessions (recommended).
        app.use(passport.initialize());
        app.use(passport.session());
    };


};

module.exports = passportConfigured;
