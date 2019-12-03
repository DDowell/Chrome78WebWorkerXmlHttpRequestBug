var express = require('express');

var bodyParser = require('body-parser');

var opener = require('opener');
 
var server = express();
server.use(express.static(__dirname + '/www'));

var textParser = bodyParser.text();
 
var port = 8080;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});

server.post('/post', textParser, function(req,res){
	res.send("Client said '"+req.body+"' to server.");
});

opener('http://localhost:8080/index.html');