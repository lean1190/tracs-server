/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var moment = require("moment"),
    logger = require("../utils/Logger"),
    mongoose = require("mongoose"),
    Patient = mongoose.model("Patient");

var NotificationsService = {};

/**
 * Notification types = {
 *   "patient.profile.added": cuando se agrega un participante al tratamiento de un paciente
 *   "patient.detail.updated": cuando se actualiza alguno de los datos del perfil de un paciente
 *   "patient.opinion.updated": cuando se actualizan las opiniones de un paciente
 *   "patient.people.updated": cuando se actualizan los contactos de la vista de un paciente
 * }
*/

/**
 * Crea un modelo de notificacion a partir de un mensaje y un tipo
 * Deberia usarse siempre que se quiera agregar una notificación
 * @param   {string} message el mensaje
 * @param   {string} type    el tipo
 * @returns {object} una notificación armada
 */
NotificationsService.createNotification = function (message, type) {
    "use strict";

    return {
        message: message,
        type: type,
        timestamp: moment().format()
    };
};

/**
 * Agrega una notificacion al arreglo de notificaciones de un paciente
 * @param   {object}  patient un model paciente
 * @param   {string}  message el mensaje
 * @param   {string}  type    el tipo
 * @returns {promise} una promesa con el resultado de guardar el paciente
 */
NotificationsService.createNotificationForPatient = function (patient, message, type) {
    "use strict";

    patient.notifications.push(NotificationsService.createNotification(message, type));

    return patient.save().then(null, function (error) {
        logger.error("No se pudo agregar la notificacion " + message + " para el paciente con id " + patient._id, error);
    });
};

/**
 * Recupera un paciente y agrega una notificacion al arreglo de notificaciones
 * @param   {number}  patientId el id de un paciente
 * @param   {string}  message el mensaje
 * @param   {string}  type    el tipo
 * @returns {promise} una promesa con el resultado de guardar el paciente
 */
NotificationsService.createNotificationForPatientId = function (patientId, message, type) {
    "use strict";

    return Patient.findById(patientId).then(function (patient) {
        return NotificationsService.createNotificationForPatient(patient, message, type);
    });
};

module.exports = NotificationsService;
