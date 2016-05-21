/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/Profile");
require("../models/Patient");
require("../models/User");
require("../models/PatientOpinion");
require("../models/PatientNote");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Profile = mongoose.model("Profile"),
    PatientOpinion = mongoose.model("PatientOpinion"),
    NotificationsService = require("./NotificationsService"),
    PatientNote = mongoose.model("PatientNote"),
    PatientNoteService = require("./PatientNoteService"),
    //PatientService = require ("./PatientService"),
    PatientOpinionService = require ("./PatientOpinionService");

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
        return PatientOpinionService.addOpinion(newPatientOpinion).then(function(opinion){

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

/**
 * Devuelve las notas que hizo un usuario sobre un paciente determinado
 * @param   {number} patientId id del paciente del que se busca las notas
 * @param   {number} userId    id del usuario que realizo las notas
 * @returns {promise} una promesa con el perfil con las notas buscadas
 */
ProfileService.getPatientNotes = function(patientId,userId){
    "use strict";

    return Profile.find({patient:patientId, user: userId}).populate("patientNotes").exec();

};

/**
 * Crea y agrega una nueva nota al perfil
 * @param   {number} patientId  id del paciente sobre el que se hizo la nota
 * @param   {number} userId   id del usuario que realizo la nota
 * @param   {object} reqPatientNote datos de la nota a guardar
 * @returns {promise} una promesa con el perfil modificado
 */

ProfileService.addPatientNote = function(patientId,userId,reqPatientNote){
    "use strict";

    var newPatientNote = new PatientNote(reqPatientNote);

    return ProfileService.getSpecificProfile(patientId, userId).then(function (profile) {

        newPatientNote.profile = profile._id;
        return newPatientNote.save().then(function(patientNote){

            profile.patientNotes.push(newPatientNote._id);

            return profile.save().then(function(updatedProfile){
                return updatedProfile;
            }, function(error){
                logger.error("No se pudo actualizar el perfil con la nueva opinion", error);
            });

        }, function(error){
            logger.error("No se pudo guardar la nueva opinion", error);
        });

     }, function(error){
        logger.error("No se pudo obtener el perfil", error);
    });
};

ProfileService.removeProfile = function(patientId, userId){
    "use strict";

    //Se busca el id del profile
    return ProfileService.getSpecificProfile(patientId, userId).then(function(profile){
        //Se borran las notas relacionadas al perfil
        return PatientNoteService.deleteFromProfile(profile._id).then(function(deletedNote){
            //Se borran las opiniones relacionadas al perfil
            return PatientOpinionService.deleteFromProfile(profile._id).then(function(deletedOpinions){
                //Se borra el perfil de la lista de perfiles del paciente

                /* return PatientService.deleteProfile(patientId,profile._id).then(function(updatedPatient){*/

                    return profile.remove().then(function(deletedProfile){
                        return deletedProfile;
                    }, function(error){
                        logger.error("No se pudo borrar el perfil", error);
                    });

                /*},function(error){
                    logger.error("No se pudo borrar el perfil en el paciente", error);
                });*/

            }, function(error){
                logger.error("No se pudieron borrar las opiniones relacionadas al perfil", error);
            });
        }, function(error){
            logger.error("No se pudo borrar las notas relacionadas al perfil", error);
        });

    }, function(error){
        logger.error("No se pudo obtener el perfil buscado", error);
    });
};

module.exports = ProfileService;
