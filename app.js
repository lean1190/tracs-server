/* jshint bitwise: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, require, module, __dirname */

var // Config modules
    Database = require("./config/Database"),
    Application = require("./config/Application"),

    // Routes modules
    CommonRouter = require("./routers/CommonRouter"),
    SessionRouter = require("./routers/SessionRouter"),
    UserRouter = require("./routers/UserRouter"),
    TreatmentRouter = require ("./routers/TreatmentRouter"),
    PatientRouter = require("./routers/PatientRouter"),
    ProfileRouter = require("./routers/ProfileRouter"),
    ImAPatientRouter = require("./routers/ImAPatientRouter"),

    // Environment configs
    config = require("./utils/Config");

// ===== DATABASE CONNECTION
var db = new Database({ connectionUrl : config.database_url });
db.connect();

// ===== APP SETUP
var app = new Application({path: __dirname, folder: "public"}, [
    {route: "/", handler: CommonRouter},
    {route: "/session", handler: SessionRouter},
    {route: "/user", handler: UserRouter},
    {route: "/treatment", handler: TreatmentRouter},
    {route: "/patient", handler: PatientRouter},
    {route: "/profile", handler: ProfileRouter},
    {route: "/imAPatient", handler: ImAPatientRouter},
]);

var io = require('socket.io')(4000);
var roomMembers = {};

io.on('connection', function(socket){

    //Escucha en el canal 'join:room' usado cuando un usuario quiere entrar al chat
    socket.on('join:room', function(data){

        var room_name = data.room_name;

        if(!roomMembers[room_name]) {
            roomMembers[room_name] = {
                    members: []
                }
        }

        roomMembers[room_name].members.push(data.userInfo);

        var enterRoomMsg = {

            user: data.userInfo.name,
            text: "ha ingresado a la sala",
            time: new Date()
        };

        socket.join(room_name);

        //Envia a todos los miembros del canal una actualizacion del arreglo de participantes del chat
        socket.emit('chat:members', roomMembers[room_name].members);

        //Envia al usuario que acaba de ingresar al canal el arreglo de participantes del chat
        socket.in(room_name).emit('chat:members', roomMembers[room_name].members);

        //Envia a todos los miembros del canal el mensaje de entrada del usuario que entra a la sala
        socket.in(room_name).emit("message",enterRoomMsg);

    });

    //Escucha en el canal 'leave:room' usado cuando un usuario quiere dejar el chat
    socket.on('leave:room', function(msg){

        for(var i=0;i<roomMembers[msg.room].members.length;i++){

            if (roomMembers[msg.room].members[i].id=== msg.id){

                roomMembers[msg.room].members.splice(i,1);
                break;
            }
        }

        msg.text = "has left the room";
        socket.leave(msg.room);

        //Envia a todos los miembros del canal el mensaje de salida del usuario que deja la sala
        socket.in(msg.room).emit('message', msg);

        //Envia a todos los miembros del canal una actualizacion del arreglo de participantes del chat
        socket.in(msg.room).emit('chat:members', roomMembers[msg.room].members);

    });

    //Escucha en el canal 'send:message' usado cuando se envia un nuevo mensaje
    socket.on('send:message', function(msg){
        socket.in(msg.room).emit('message', msg);
    });

});

module.exports = app;
