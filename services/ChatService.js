/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/ChatHistory");

var mongoose = require("mongoose"),
    logger = require("../utils/Logger"),
    Chat = mongoose.model("ChatHistory");

var ChatService = {};

ChatService.addChatRoom = function(roomName){

    var newChatRoom = {
        roomId: roomName,
        messages: []
    };

    var chatRoom = new Chat(newChatRoom);


    Chat.find({roomId: roomName}, function (err, resultRooms) {

        if (err){
            logger.error("No se pudo encontrar la sala", err);
        };

        if (!(resultRooms.length)){

            var chatRoom = new Chat(newChatRoom);
            console.log(chatRoom);
            chatRoom.save(function (err) {
                if (err){
                    logger.error("No se pudo agregar la nueva sala", err);
                    return err;
                };
            });
        }
    });
};

ChatService.saveRoomMessages = function(roomName,roomMessages){

    console.log("llego al leave message");
    Chat.findOne({roomId: roomName}, function (err, chatRoom) {

        if (err){ logger.error("No se pudo obtener la sala", err);
        };

        for (var i = 0; i<roomMessages.length;i++) {
            chatRoom.messages.push(roomMessages[i]);
        }

        chatRoom.save(function (err) {
            if (err){
                logger.error("No se pudo agregar la nueva sala", err);
            };

        });
    });
};

ChatService.getRoomMessages = function(roomName){

/*  return Chat.findOne({roomId: roomName}).then(function(chatRoom){
        return chatRoom.messages;

    }, function(error){
        logger.error("No se pudo obtener la sala",error);
        return error;
    });*/

    /*Chat.findOne({roomId: roomName},function (err, chatRoom ) {

        if (err){
            logger.error("No se pudo obtener la sala", err);
        };

        return chatRoom.messages;
    });*/

    //return Chat.findOne({roomId: roomName}, "messages").exec();
};

module.exports = ChatService;
