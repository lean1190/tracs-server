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

        // Mock data!!!
        closestPeople: [
            {
                personId: req.body.admin,
                name: "Prueba1",
                phoneNumber: "2214180840",
                picture: "http://notihoy.com/site/wp-content/uploads/2015/03/emilia11-755x380.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            },
            {
                personId: req.body.admin,
                name: "Prueba2",
                phoneNumber: "2214180840",
                picture: "http://www.hercampus.com/sites/default/files/2015/02/15/Natalie-Dormer%3A-People-Magazine-2014--01-662x883.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            },
            {
                personId: req.body.admin,
                name: "Prueba3",
                phoneNumber: "2214180840",
                picture: "http://losandes.com.ar/files/image/15/11/image563bbefa2720d3.37124491.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            },
            {
                personId: req.body.admin,
                name: "Prueba4",
                phoneNumber: "2214180840",
                picture: "https://i.ytimg.com/vi/x4Iu_ibISac/hqdefault.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            }
        ]
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
PatientController.updatePatientDetail = function (req,res){
    "use strict";

    var updatedPatient = {
        id: req.body._id,
        name: req.body.name,
        birthDate: req.body.birthDate, //"12/12/2012"
        generalDescription: req.body.generalDescription || "", //"description"
        DNI: req.body.DNI || "",
        phoneNumber: req.body.phoneNumber || ""
    };

    PatientService.updatePatientDetail(updatedPatient).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });

};

PatientController.updateClosestPeople = function (req, res){
    "use strict";

    var closestPeople = req.body;
    var patientId = req.params.id;

    PatientService.updateClosestPeople(patientId,closestPeople).then(function (patient) {
        res.status(200).jsonp(patient);
    }, function (err) {
        return res.status(500).send(err.message);
    });

};

PatientController.addProfileToPatient = function(req,res){
    "use strict";

    var newProfile = {
        patient: req.params.id,
        user: req.body.user,
        description: req.body.description,
        isAdmin: false
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
 * @param   {object}   req contiene el id del usuario y del paciente
 * @param   {object} res [[Description]]
 * @returns {object} las notas que hizo el usuario sobre un paciente determinado
 */
PatientController.getPatientNotes = function(req,res){

    var patientId = req.params.idPatient;
    var userId = req.params.idUser;

    ProfileService.getPatientNotes(patientId,userId).then(function(profile){

        res.status(200).jsonp(profile[0].patientNotes);

    }, function (err) {
        return res.status(500).send(err.message);
    });
}

PatientController.getPatientNote = function (req, res) {
    "use strict";

    var noteId = req.params.noteId;

    PatientNoteService.getPatientNote(noteId).then(function (note) {
        res.status(200).jsonp(note);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

PatientController.getPatientDiagnosis = function (req, res) {
    "use strict";

    var patientId = req.params.id;

    PatientService.getPatientDiagnosis(patientId).then(function (result) {;
        res.status(200).jsonp(result.latestDiagnosis);
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

    var patientId = req.params.id;
    var userId = req.body.user;

    var patientNote = {

        title: req.body.title,
        description: req.body.description,
        date: new Date()
    }

    ProfileService.addPatientNote(patientId,userId, patientNote).then(function(createdNote){
        res.status(200).jsonp(createdNote);
    }, function (err) {
        return res.status(500).send(err.message);
    });
}

/**
 * Agrega un diagnostico sobreun paciente
 * @param   {object}   req id del paciente al cualse asigna el diagnostico conjuntamente con la informacion del diagnostico
 * @param   {object} res
 * @returns {object} el diagnostico creado
 */
PatientController.addPatientDiagnosis = function(req,res){


    var newDiagnosis = {
        patient: req.body.patient,
        description: req.body.description,
        inCaseOfCrisis: req.body.inCaseOfCrisis,
        date: moment().format()
    };

    PatientService.addPatientDiagnosis(newDiagnosis).then(function(createdDiagnosis){
        res.status(200).jsonp(createdDiagnosis);
    }, function (err) {
        return res.status(500).send(err.message);
    });
}



//Borrador para carga masiva de datos. Me los guarda pero tira un error por el .exec(). Despues lo termino de analizar
PatientController.bulkInsert = function(req,res){
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
