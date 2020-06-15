const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(5000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/views/dashboard.html');
})
var srvSockets = io.sockets.sockets;
console.log(Object.keys(srvSockets).length);

io.on('connection', (socket) => {
  console.log(Object.keys(srvSockets).length);
  socket.on('data', (data) => {
    console.log(data);
  });
});