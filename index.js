var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(socket){
    console.log('user disconnected');
  });
  
  socket.on('message', function(msg){
    console.log('message received. broadcasting...');
    socket.broadcast.emit('update', msg);
  });
});





http.listen(3000, function(){
  console.log('listening on *:3000');
});