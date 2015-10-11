/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: Number,
    name: String,
    phone: String,
    email: String,
    photo: String,

    accessToken: String,
    refreshToken: String,
});

module.exports = mongoose.model("User", UserSchema);
