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
//var members =[];

//usado para prueba, volar en el futuro
/*roomMembers["room_570c69414176cb9911ebee51"] = { members:[]};
roomMembers["room_570c69414176cb9911ebee51"].members.push(
        {
            id: "56e48d14db1fb2bb603f2028",
            name: "Marques Alonzo",
            picture: "https://lh5.googleusercontent.com/-PhQO5UNCR5E/AAAAAAAAAAI/AAAAAAAAAEA/Nh1KJaVTSXI/photo.jpg"
        });*/

io.on('connection', function(socket){

    socket.on('join:room', function(data){

        console.log(data);
        var room_name = data.room_name;

        if(!roomMembers[room_name]) {
            roomMembers[room_name] = {
                    members: []
                }
        }


        /*roomMembers[room_name].members.push(data.userInfo.id);

        if(!roomMembers[room_name].members[data.userInfo.id]) {

            roomMembers[room_name].members[data.userInfo.id] = {

                    memberInfo: []
                }
        }
        */

        roomMembers[room_name].members.push(data.userInfo);

        console.log(roomMembers[room_name].members);

        /*roomMembers[room_name].members[data.userInfo.id] = {

                    memberInfo: []
                }


        roomMembers[room_name].members[data.userInfo.id].memberInfo.push(data.userInfo);

        console.log(roomMembers[room_name].members[data.userInfo.Id].memberInfo);

*/
        console.log(roomMembers[room_name].members);

        socket.join(room_name);
        socket.emit('chat:members', roomMembers[room_name].members);

        //socket.in(room_name).emit('chat:members', roomMembers[room_name].members);


        //armar broadcast para todos los otrosque esten en la room y vean el ingreso del nuevo participante
    });


    socket.on('leave:room', function(msg){
        console.log("llego al leave");
        //console.log(roomMembers);
        roomMembers = [];
        //console.log(roomMembers);
        //console.log(msg);
        console.log(msg.room);
        msg.text = msg.user + " has left the room";
        console.log(msg);
        socket.leave(msg.room);

        //socket.to(msg.room).emit('message',msg);
        //socket.in(msg.room).emit('message', msg);
        socket.emit('message', msg);

    });

    socket.on('send:message', function(msg){
        socket.in(msg.room).emit('message', msg);
    });

});

module.exports = app;
