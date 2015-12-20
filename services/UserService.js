/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/User");
require("../models/Treatment");

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    utilsHelper = require("../utils/UtilsHelper");

var UserService = {},
    self = UserService;



/**
 *  ===============================
 *  ==== BASIC USER OPERATIONS ====
 *  ===============================
 */

// Remove the image resize parameter after the extension
// Google set it to the profile photo
UserService.removeImageSize = function (imageUrl) {
    "use strict";
    var parametersPosition = imageUrl.indexOf("?");

    return imageUrl.substring(0, parametersPosition !== -1 ? parametersPosition : imageUrl.length);
};

// Return all users
UserService.findAll = function () {
    "use strict";

    // return User.find().populate("treatments").exec();
    return User.find().exec();
};

// Return a User with specified ID
UserService.findById = function (userId) {
    "use strict";

    return User.findById(userId).exec();
};

// Return a User with specified name
UserService.findByName = function (name) {
    "use strict";

    return User.find({
        name: name
    }).exec();
};

// Add a new User
UserService.addUser = function (reqUser) {
    "use strict";

    var newUser = new User(reqUser);

    return User.save(newUser).then(function (user) {
        return user;
    }, function (err) {
        return err;
    });
};

// Update an existing User
UserService.updateUser = function (reqUser) {
    "use strict";
    return userQuerier.findById(reqUser.id).then(function (user) {
        user.name = reqUser.name || user.name;
        user.phone = reqUser.phone || user.phone;
        user.email = reqUser.email || user.email;
        user.watchRound = reqUser.watchRound || user.watchRound;
        user.schedule = reqUser.schedule || user.schedule;

        return userQuerier.save(user);
    });
};

// Delete a User with specified ID
UserService.deleteUser = function (userId) {
    "use strict";
    return userQuerier.findById(userId).then(function (user) {
        userQuerier.remove(user).then(function () {
            return true;
        }, function (err) {
            return err;
        });
    });
};

// Find or create a user based on its Google id
UserService.findOrCreateUserWithGoogleProfile = function (googleProfile, accessToken, refreshToken) {
    "use strict";

    return userQuerier.findOne({
        googleId: googleProfile.id
    }).then(function (user) {
        if (utilsHelper.isEmpty(user)) {
            var profilePhoto = self.removeImageSize(googleProfile.photos[0].value);
            return self.addUser({
                googleId: googleProfile.id,
                name: googleProfile.displayName,
                phone: 15444999,
                email: googleProfile.emails[0].value,
                profilePhoto: profilePhoto,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else {
            return user;
        }
    }, function (err) {
        return err;
    });
};

module.exports = UserService;
