//Make Connection

var socket = io.connect('http://localhost:5000');

//Get All Html elements by Id
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var sendBtn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit Events
sendBtn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

//listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + '</strong>: ' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message' + '</em></p>';
});