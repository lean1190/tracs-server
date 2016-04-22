/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Profile");
require("../models/Patient");
require("../models/User");
require("../models/PatientOpinion");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Profile = mongoose.model("Profile"),
    PatientOpinion = mongoose.model("PatientOpinion"),
    NotificationsService = require("./NotificationsService");

var ProfileService = {};

/**
 * Devuelve todos los perfiles de un usuario
 * @param   {number}  userId el id del usuario para buscar los perfiles
 * @returns {promise} una promesa con los perfiles actuales del usuario
 */
ProfileService.findUserProfiles = function (userId) {
    "use strict";

    return Profile.find({"user": userId}).populate("patient").exec();
};

/**
 * Devuelve todos los perfiles que tiene asignado un paciente
 * @param   {number} patientId paciente del cual quiero saber los perfiles que tiene asignado
 * @returns {promise} una promesa con los perfiles actuales del paciente
 */
ProfileService.findPatientProfiles = function (patientId){
    "use strict";

    return Profile.find({patient: patientId}).populate("user").exec();
};


/**
 * Devuelve solo los id de usuarios de los perfiles asociados a los pacientes
 * @param   {number} patientId paciente del cual quiero saber los usuarios asignados a sus perfiles
 * @returns {promise} una promesa con los usuarios que actualmente estan relacionados a los perfiles del paciente
 */
ProfileService.getPatientUsers = function(patientId){
    "use strict";

    return Profile.find({patient: patientId},"user -_id").then(function(profiles){
        return profiles;
    }, function (error) {
        logger.error("No se pudo obtener los usuarios relacionados al paciente", error);
        return error;
    });
};

/**
 * Obtener las opiniones de los participantes sobre un paciente determinado
 * @param   {number} patientId Id del paciente del cual se quieren obtener las opiniones
 * @returns {promise} Una promesa con las opiniones sobre un paciente
 */
ProfileService.getPatientOpinions = function(patientId){
    "use strict";

    return Profile.find({"patient": patientId},"user latestPatientOpinion -_id").populate("latestPatientOpinion user").exec();
};

/**
 * Obtiene el perfil basado en usuario y paciente
 * @param   {number} patientId Id del paciente del perfil a buscar
 * @param   {number} userId    Id del usuario del perfil a buscar
 * @returns {promise} una promesa con el perfil correspondiente al usuario y paciente deseado
 */
ProfileService.getSpecificProfile = function(patientId, userId){
    "use strict";

    return Profile.find({patient:patientId, user: userId}).then(function(profile){

        return profile[0];

    }, function(error){
        logger.error("No se pudo obtener el perfil relacionado al paciente y usuario especificados",error);
        return error;
    });
};

/**
 * Crea un nuevo perfil
 * @param   {object}  reqProfile el perfil con los datos básicos
 * @returns {promise} una promesa con el perfil creado
 */
ProfileService.add = function(reqProfile) {
    "use strict";

    var newProfile = new Profile(reqProfile);

    return newProfile.save().then(function(profile){
        return profile;
    }, function (error) {
        logger.error("No se pudo guardar el profile", error);
        return error;
    });

};

/**
 * Agrega una opinion de un participante sobre un paciente
 * @param   {object}   patientOpinion Opinion a agregar
 * @param   {number} userId Id del usuario que esta emitiendo la opinion
 * @param   {number} patientId      Id del paciente sobre el cual se esta emitiendo una opinion
 * @returns {promise} Una promesa con el perfil que se esta modificando
 */
ProfileService.addPatientOpinion = function(patientOpinion, userId, patientId){
    "use strict";

    return ProfileService.getSpecificProfile(patientId, userId).then(function (profile) {
        patientOpinion.profile = profile._id;
        var newPatientOpinion = new PatientOpinion(patientOpinion);

        return newPatientOpinion.save().then(function(opinion){
            profile.latestPatientOpinion = opinion._id;

            return profile.save().then(function(updatedProfile){
                NotificationsService.createNotificationForPatientId(patientId, "Se actualizaron las opiniones", "patient.opinion.updated");

                return updatedProfile;
            }, function(error){
                logger.error("No se pudo guardar el perfil actualizado con la opinion del paciente",error);
            });
        }, function(error){
            logger.error("No se pudo guardar la nueva opinion sobre el paciente", error);
        });
    }, function(error){
        logger.error("No se pudo obtener el perfil", error);
    });
};

ProfileService.getPatientNotes = function(patientId,userId){
    "use strict";

    console.log(patientId,userId);

    return ProfileService.getSpecificProfile(patientId, userId).then(function (profile) {
        console.log(profile);
        return profile.patientNotes;
    }, function(error){
        logger.error("No se pudo obtener el perfil", error);
    });

}

module.exports = ProfileService;
