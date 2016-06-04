/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var moment = require("moment"),
    PatientService = require("../services/PatientService"),
    ProfileService = require("../services/ProfileService"),
    UserService = require("../services/UserService"),
    PatientNoteService = require("../services/PatientNoteService");

var PatientController = {};

/**
 * Devuelve todos los perfiles de un usuario pasando su id
 * @param   {object} req {get: id} el id del usuario
 * @param   {object} res
 * @returns {Array}  el arreglo de perfiles de un usuario
 */
PatientController.findUserPatients = function (req, res) {
    "use strict";

    var userId = req.params.id;
    ProfileService.findUserProfiles(userId).then(function (patients) {
        res.status(200).jsonp(patients);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};


/**
 * Obtiene los detalles de un paciente especifico
 * @param   {object} req {get: id} el id del paciente
 * @param   {object} res
 * @returns {object} el paciente con el total de su informacion
 */
PatientController.getPatientDetail = function (req, res) {
    "use strict";

    var patientId = req.params.id;

    PatientService.getPatientDetail(patientId).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Obtiene los parcipantes relacionados a un paciente
 * @param   {object} req {get: id} el id del paciente
 * @param   {object} res
 * @returns {Array}  los participantes relacionados al paciente
 */
PatientController.getPatientProfiles = function (req,res){
    "use strict";

    var patientId = req.params.id;

    ProfileService.findPatientProfiles(patientId).then(function(users){
         res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Recupera los usuarios que pueden ser asignados al paciente
 * @param   {object} req {get: id} el id del paciente
 * @param   {object} res
 * @returns {Array}  los usuarios que pueden ser asignados
 */
PatientController.getSelectableUsers = function (req,res){
    "use strict";

    var patientId = req.params.id;

    UserService.getSelectableUser(patientId).then(function(users){
       res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Crea un nuevo paciente con un usuario administrador asociado
 * @param   {object} req {post: name, dateOfBirth, description, dni, phoneNr, admin}
 * @param   {object} res
 * @returns {object} el paciente creado
 */
PatientController.add = function (req, res) {
    "use strict";

    var newPatient = {
        name: req.body.name,
        birthDate: req.body.birthDate, //"12/12/2012"
        generalDescription: req.body.description, //"description"
        DNI: req.body.dni,
        phoneNumber: req.body.phoneNr,
        notifications: [],
        contactInfo : {},
        closestPeople: [],
        history:{}
    };

    PatientService.add(newPatient, req.body.admin).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Edita la informacion de un paciente
 * @param   {object} req {put: id, name, dateOfBirth, generalDescription, dni, phoneNr, }
 * @param   {object} res
 * @returns {object} el paciente modificado
 */
PatientController.updatePatientGeneralInfo = function (req,res){
    "use strict";

    var patientId = req.params.id;
    var updatedPatientGeneralInfo = {

        name: req.body.name,
        birthDate: req.body.birthDate,
        generalDescription: req.body.generalDescription || "",
        DNI: req.body.DNI || "",
        phoneNumber: req.body.phoneNumber || ""
    };

    PatientService.updatePatientGeneralInfo(patientId,updatedPatientGeneralInfo).then(function (updatedPatient) {
        res.status(200).jsonp(updatedPatient);
    }, function (err) {
        return res.status(500).send(err.message);
    });

};

/**
 * Actualiza la informacion de contacto del paciente
 * @param   {object} req informacion de contacto actualizada
 * @param   {object} res
 * @returns {object} el paciente modificado
 */
PatientController.updatePatientContactInfo = function(req,res){
    "use strict"

    var updatedPatientContactInfo = req.body;
    var patientId = req.params.id;
    console.log("llegue aca");
    PatientService.updatePatientContactInfo(patientId,updatedPatientContactInfo).then(function (updatedPatient) {
        res.status(200).jsonp(updatedPatient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
}

/*
 * Actualiza los contactos del paciente
 * @param   {object} req
 * @param   {object} res
 * @returns {object} el paciente modificado
 */

PatientController.updateClosestPeople = function (req, res){
    "use strict";

    var closestPeople = req.body,
        patientId = req.params.id;

    PatientService.updateClosestPeople(patientId,closestPeople).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

PatientCOn

/**
 * Agrega un perfil participante al tratamiento del paciente
 * @param   {object} req
 * @param   {object} res
 * @returns {object} el paciente modificado
 */
PatientController.addProfileToPatient = function(req,res){
    "use strict";

    var newProfile = {
        patient: req.params.id,
        user: req.body.user,
        description: req.body.description,
        isAdmin: false,
        isParent: req.body.isParent || false
    };

    PatientService.addProfileToPatient(newProfile).then(function(patient){
        res.status(200).jsonp(patient);
    }, function (err){
        return res.status(500).send(err.message);
    });

};

/**
 * Añade una nueva opinion de un perfil a un paciente determinado
 * @param   {object} req {put: description, user, id}
 * @param   {object} res
 * @returns {object} el perfil modificado con la ultima opinion ingresada
 */
PatientController.addPatientOpinion = function (req,res){
    "use strict";

    var newOpinion = {};

    var userId = req.body.user;
    var patientId = req.params.id;

    newOpinion.description = req.body.description;
    newOpinion.date = moment().format();

    ProfileService.addPatientOpinion(newOpinion, userId, patientId).then(function (profile) {
        res.status(200).jsonp(profile);
    }, function (err) {
        return res.status(500).send(err.message);
    });

};

/**
 * Recupera las últimas notificaciones de un paciente
 * @param {object} req {get: id} el id del paciente
 * @param {Array}  res las notificaciones para el paciente
 */
PatientController.getNotifications = function(req, res) {
    "use strict";

    var patientId = req.params.id;

    PatientService.getNotifications(patientId).then(function(notifications) {
        res.status(200).jsonp(notifications);
    }, function (err){
        return res.status(500).send(err.message);
    });
};


/**
 * Obtiene las opiniones de los diferentes perfiles que fueron hechas sobre un paciente determinado
 * @param   {object} req {get: id}
 * @param   {object} res
 * @returns {object} las opiniones junto a los usuarios que las hicieron
 */
PatientController.getPatientOpinions = function (req,res){
    "use strict";

    var patientId = req.params.id;

    ProfileService.getPatientOpinions(patientId).then(function (patientOpinions) {
        res.status(200).jsonp(patientOpinions);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Obtiene las que hizo un usuario sobre un paciente
 * @param   {object} req contiene el id del usuario y del paciente
 * @param   {object} res [[Description]]
 * @returns {object} las notas que hizo el usuario sobre un paciente determinado
 */
PatientController.getPatientNotes = function(req,res){
    "use strict";

    var patientId = req.params.idPatient;
    var userId = req.params.idUser;

    ProfileService.getPatientNotes(patientId,userId).then(function(profile){

        res.status(200).jsonp(profile[0].patientNotes);

    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Recupera una nota de un paciente
 * @param   {object} req
 * @param   {object} res
 * @returns {object} la nota
 */
PatientController.getPatientNote = function (req, res) {
    "use strict";

    var noteId = req.params.noteId;

    PatientNoteService.getPatientNote(noteId).then(function (note) {
        res.status(200).jsonp(note);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};


/**
 * Agrega una nueva nota sobre un paciente
 * @param   {object} req id del paciente a agregar conjuntamente con la informacion de la nueva nota
 * @param   {object} res
 * @returns {object} la nota creada
 */
PatientController.addPatientNote = function(req,res){
    "use strict";

    var patientId = req.params.id;
    var userId = req.body.user;

    var patientNote = {

        title: req.body.title,
        description: req.body.description,
        date: new Date()
    };

    ProfileService.addPatientNote(patientId,userId, patientNote).then(function(createdNote){
        res.status(200).jsonp(createdNote);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

/**
 * Agrega un diagnostico sobre un paciente
 * @param   {object} req id del paciente al cualse asigna el diagnostico conjuntamente con la informacion del diagnostico
 * @param   {object} res
 * @returns {object} el diagnostico creado
 */
PatientController.addPatientDiagnosis = function(req,res){
    "use strict";

    var newDiagnosis = {
        patient: req.body.patient,
        description: req.body.description,
        name: req.body.name,
        //vitalHistory: req.body.vitalHistory,
        date: moment().format(),
        madeBy : req.body.madeBy
    };

    PatientService.addPatientDiagnosis(newDiagnosis).then(function(createdDiagnosis){
        res.status(200).jsonp(createdDiagnosis);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Borrador para carga masiva de datos
PatientController.bulkInsert = function(){
    "use strict";

    PatientService.bulkInsert(function(err,patients){
    if (err) {
        console.log("Exploto todo");
        // TODO: handle error
    } else {
        console.info("%d potatoes were successfully stored.", patients.length);
        return patients;
    }
    });
};

module.exports = PatientController;

