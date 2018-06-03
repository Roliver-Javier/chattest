var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var roomno=1;
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    var room = io.nsps['/'].adapter.rooms['room-'+roomno];
    if( room && room.length > 1) roomno++;

    socket.join('room-'+roomno);
    io.sockets.in('room-'+roomno).emit('connectToRoom','You are in room no. '+roomno);  
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});