/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

var PatientService = require("../services/PatientService"),
    ProfileService = require("../services/ProfileService"),
    UserService = require("../services/UserService");

var PatientController = {};

/**
 * Devuelve todos los perfiles de un usuario pasando su id
 * @param   {object} req {get: id}
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
 * @param   {object} req {get: id}
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
 * @param   {object}   req params.id el id del paciente
 * @param   {object} res
 * @returns {object} los participantes relacionados al paciente
 */
PatientController.getPatientProfiles = function (req,res){

    var patientId = req.params.id;

    ProfileService.findPatientProfiles(patientId).then(function(users){
         res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
}

PatientController.getSelectableUsers = function (req,res){

    var patientId = req.params.id;

    UserService.getSelectableUser(patientId).then(function(users){
       res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
}

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

        // Mock data!!!
        closestPeople: [
            {
                personId: req.body.admin,
                name: "Prueba1",
                phone: "2214180840",
                picture: "http://notihoy.com/site/wp-content/uploads/2015/03/emilia11-755x380.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            },
            {
                personId: req.body.admin,
                name: "Prueba2",
                phone: "2214180840",
                picture: "http://www.hercampus.com/sites/default/files/2015/02/15/Natalie-Dormer%3A-People-Magazine-2014--01-662x883.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            },
            {
                personId: req.body.admin,
                name: "Prueba3",
                phone: "2214180840",
                picture: "http://losandes.com.ar/files/image/15/11/image563bbefa2720d3.37124491.jpg",
                priority: Math.floor((Math.random() * 3) + 1)
            },
            {
                personId: req.body.admin,
                name: "Prueba4",
                phone: "2214180840",
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


//Borrador para carga masiva de datos. Me los guarda pero tira un error por el .exec(). Despues lo termino de analizar
PatientController.bulkInsert = function(req,res){

    PatientService.bulkInsert(function(err,patients){
    if (err) {
        console.log("Exploto todo");
        // TODO: handle error
    } else {
        console.info('%d potatoes were successfully stored.', patients.length);
        return patients;
    }
    })
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

PatientController.addProfileToPatient = function(req,res){
    "use strict";

    var newProfile ={
        patient: req.params.id,
        user: req.body.user,
        description: req.body.description,
        isAdmin: false
    };

    PatientService.addProfileToPatient(newProfile).then(function(patient){
        res.status(200).jsonp(patient);
    },function (err){
        return res.status(500).send(err.message);
    });

};



module.exports = PatientController;
