var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(5000, function(){
    console.log('listening to port 5000 at OvO Sound Radio');
});

app.use(express.static('public'));

var io = socket(server);

//Socket Connection to different sockets or users
io.on('connection', function(socket){
    console.log('socket connected');

    //listening to recieve data 
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});