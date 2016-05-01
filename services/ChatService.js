/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

require("../models/ChatHistory");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Chat = mongoose.model("ChatHistory");

var ChatService = {};

ChatService.addChatRoom = function(roomName){
    "use strict";

    var newChatRoom = {
        roomId: roomName,
        messages: []
    };

    Chat.find({roomId: roomName}).exec().then(function (resultRooms) {
        if (!(resultRooms.length)){
            var chatRoom = new Chat(newChatRoom);

            return chatRoom.save();
        }
    }, function(error) {
        logger.error("No se pudo agregar la nueva sala " + roomName, error);
        return error;
    });
};

ChatService.saveRoomMessages = function(roomName, roomMessages){
    "use strict";

    return Chat.findOne({roomId: roomName}).then(function (chatRoom) {

        for (var i = 0; i < roomMessages.length;i++) {
            chatRoom.messages.push(roomMessages[i]);
        }

        return chatRoom.save();
    }, function(error) {
        logger.error("No se pudo obtener la sala " + roomName, error);
        return error;
    });
};

ChatService.getRoomMessages = function(roomName){
    "use strict";

    return Chat.findOne({roomId: roomName}).then(function(chatRoom){
        return chatRoom.messages;
    }, function(error){
        logger.error("No se pudo obtener la sala " + roomName, error);
        return error;
    });
};

module.exports = ChatService;
