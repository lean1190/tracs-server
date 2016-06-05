/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    
    name: { type: String, required: true },
    DNI: { type: String, required: true },
    address: String,
    birthDate: { type: Date, required: true },
    picture: String,
    generalDescription: String,
    phoneNumber: String,
    contactInfo: {
        name: String,
        address: String,
        city: String
    },
    latestDiagnosis: { type: Schema.Types.ObjectId, ref : "Diagnosis" },

    profiles: [{ type: Schema.Types.ObjectId, ref : "Profile" }],

    treatment: [{ type: Schema.Types.ObjectId, ref : "Treatment" }],
    closestPeople: [
        {
            personId: { type: String, required: true },
            name: { type: String, required: true },
            phoneNumber: { type: String},
            picture: { type: String, required: true },
            priority: { type: Number, required: true }
        }
    ],
    notifications: [
        {
            type: { type: String, required: true },
            message: { type: String, required: true },
            data: {},
            timestamp: { type: Date, required: true }
        }
    ],

    history: {
        description: String,
        prevTherapyPlace: String,
        prevTherapyDuration: String
    },

    geoAlert:[
        {
            accuracy: Number,
            altitude: Number,
            altitudeAccuracy: String,
            heading: Number,
            latitude: Number,
            longitude: Number,
            speed: Number,
            timestamp: String,
        }
    ]
});

module.exports = mongoose.model("Patient", PatientSchema);

