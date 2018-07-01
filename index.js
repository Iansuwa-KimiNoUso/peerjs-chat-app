const express = require('express');
const app = express();
const ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function (req, res, next) {

    res.sendfile('client/index.html');

}).listen(8080);

var options = {
    debug: true
}

var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, options);

app.use(express.static(__dirname + '/' ));
app.use('/peerjs', peerserver);

server.listen(9000);
console.log(`server is listening on port:9000 and home on http://localhost:8080`);
