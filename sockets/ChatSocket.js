/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, module, require */

var moment = require("moment"),
    logger = require("../utils/Logger");

var chatSocket = function ChatSocket(io) {
    "use strict";

    // Variables que manejan el estado de miembros
    // e historial de mensajes de cada room
    var roomMembers = {},
        roomMsgHist = {};

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
            }

            if (!roomMsgHist[roomName]) {
                roomMsgHist[roomName] = {
                    messages: []
                };
            }

            // Se recorre la lista de miembros para asegurar que el usuario no este duplicado
            cleanChatMembers(roomName, data.userInfo.id);

            // Agrega el usuario al arreglo de miembros del room
            roomMembers[roomName].members.push(data.userInfo);

            for (var i = 0; i < roomMsgHist[roomName].messages.length; i++) {
                // Envia al usuario que se acaba de unir al chat el historial de mensajes que ha sido enviado hasta el momento en su canal
                socket.emit("hist:messages", roomMsgHist[roomName].messages[i]);
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
            roomMsgHist[msg.room].messages.push(msg);
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
