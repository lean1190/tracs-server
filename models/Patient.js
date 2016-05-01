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
    diagnosis: [{ type: Schema.Types.ObjectId, ref : "Diagnosis" }],
    profiles: [{ type: Schema.Types.ObjectId, ref : "Profile" }],
    treatment: [{ type: Schema.Types.ObjectId, ref : "Treatment" }],
    closestPeople: [
        {
            personId: { type: String, required: true },
            name: { type: String, required: true },
            phoneNumber: { type: String, required: true },
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

//Ejemplo Geo paquete georef

/*accuracy: 3.9000000953674316
altitude: 15.044444
altitudeAccuracy: null
heading: null
latitude: 65.9667
longitude: -18.5333
speed: 0
timestamp: 1461207020650*/

module.exports = mongoose.model("Patient", PatientSchema);

