/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    googleId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    about: String,
    phoneNumber: String,
    accessToken: String,
    refreshToken: String,
    profiles:[{type : Schema.Types.ObjectId, ref : "Profile"}]

});

module.exports = mongoose.model("User", UserSchema);
