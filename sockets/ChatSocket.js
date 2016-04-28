/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, module, require */

var moment = require("moment"),
    logger = require("../utils/Logger"),
    ChatService = require("../services/ChatService");

var chatSocket = function ChatSocket(io) {
    "use strict";

    // Variable que manejan el estado de miembros de cada sala.
    var roomMembers = {};

    //Almacena los mensajes historicos de la sala recuperados de la base. Solo se llena una vez, cuando entra el primer miembro de una sala
    var roomMsgHist = {};

    //Almacena los mensajes nuevos que aun no fueron guardados. Se guardan una vez que el ultimo integrante del chat se va
    var roomCurrentMsg = {};

    io.on("connection", function (socket) {

        function cleanChatMembers(roomName, userId) {
            var members = roomMembers[roomName].members;

            for (var i = 0; i < members.length; i++) {
                if (members[i].id === userId) {
                    members.splice(i, 1);
                    break;
                }
            }
        }

        function joinRoom (data) {
            var roomName = data.room;

            if (!roomMembers[roomName]) {
                roomMembers[roomName] = {
                    members: []
                };

                //Guarda la sala en la base la primera vez que se crea. Para posteriores entradas a la sala se valida que ya existe y no la guarda.
                ChatService.addChatRoom(roomName);
            }

            if (!roomMsgHist[roomName]) {

                roomMsgHist[roomName] = {
                    messages:[]
                };

            };

            //Trae los mensajes historicos de la sala solo si es el primer usuario que ingresa a la sala
            if (roomMembers[roomName].members.length == 0){
                roomMsgHist[roomName].messages = ChatService.getRoomMessages(roomName);
            };

            if (!roomCurrentMsg[roomName]){
                  roomCurrentMsg[roomName] = {
                    messages: []
                };
            };

            // Agrega el usuario al arreglo de miembros del room
            roomMembers[roomName].members.push(data.userInfo);

            console.log (roomMsgHist[roomName].messages);

            // Se recorre la lista de miembros para asegurar que el usuario no este duplicado
            cleanChatMembers(roomName, data.userInfo.id);

            // Envia al usuario que se acaba de unir al chat el historial de mensajes que ha sido enviado hasta el momento en su canal
            for (var i = 0; i < roomMsgHist[roomName].messages.length; i++) {
                socket.emit("hist:messages", roomMsgHist[roomName].messages[i]);
            };

            // Envia al usuario que se acaba de unir al chat los mensajes enviados que aun no han sido guardados en la base
            for (var x = 0; x < roomCurrentMsg[roomName].messages.length; x++) {
                socket.emit("hist:messages", roomMsgHist[roomName].messages[x]);
            }

            var enterRoomMsg = {
                user: data.userInfo.name,
                text: "ingresó",
                time: moment().format()
            };

            socket.join(roomName);

            // Envia a todos los miembros del canal una actualizacion del arreglo de participantes del chat
            socket.emit("chat:members", roomMembers[roomName].members);

            // Envia al usuario que acaba de ingresar al canal el arreglo de participantes del chat
            socket.in(roomName).emit("chat:members", roomMembers[roomName].members);

            // Envia a todos los miembros del canal el mensaje de entrada del usuario que entra a la sala
            socket.in(roomName).emit("message", enterRoomMsg);
        }

        function leaveRoom(data) {

            var roomName = data.room;
            var roomMessages = roomCurrentMsg[roomName].messages;

            //Si es el ultimo participante en abandonar la sala de chat,
            if (((roomMembers[roomName].members.length)-1) == 0){

                //Se guardan los mensajes enviados durante la ultima sesión de chat
                ChatService.saveRoomMessages(roomName,roomMessages);

                //Se limpian los mensajes enviados durante la ultima sesion de chat que aun no habian sido guardados
                roomMessages =[];

                //Se limpian los mensajes historicos que habian sido recuperados al iniciar la sala.
                roomMsgHist[roomName].messages = [];

            }

            cleanChatMembers(roomName, data.userInfo.id);

            data.text = "se fue";
            data.time = moment().format();

            socket.leave(roomName);

            // Envia a todos los miembros del canal el mensaje de salida del usuario que deja la sala
            socket.in(roomName).emit("message", data);

            // Envia a todos los miembros del canal una actualizacion del arreglo de participantes del chat
            socket.in(roomName).emit("chat:members", roomMembers[roomName].members);
        }

        function sendMessage (msg) {
            roomCurrentMsg[msg.room].messages.push(msg);
            socket.in(msg.room).emit("message", msg);
        }

        // Escucha en el canal "join:room" usado cuando un usuario quiere entrar al chat
        socket.on("join:room", joinRoom);

        // Escucha en el canal "leave:room" usado cuando un usuario quiere dejar el chat
        socket.on("leave:room", leaveRoom);

        // Escucha en el canal "send:message" usado cuando se envia un nuevo mensaje
        socket.on("send:message", sendMessage);

    });

};

module.exports = chatSocket;
