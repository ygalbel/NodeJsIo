/*var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});*/


var app = require('express')();

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('drag', function(coordinate){
    socket.broadcast.emit('drag', coordinate);
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});