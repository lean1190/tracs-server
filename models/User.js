/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    googleId: { type: Number, required: true },
    name: { type: String, required: true },
    about: String,
    telephone: String,
    picture: String,
    accessToken: String,
    refreshToken: String,
    treatments:[{type : Schema.Types.ObjectId, ref : "Treatment"}]

});

module.exports = mongoose.model("User", UserSchema);
