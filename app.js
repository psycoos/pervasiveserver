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
io.emit('client_count', srvSockets)

data_list = [];

function computeAndClear(list){
  all = list.length;
  count = list.length - list.sort().indexOf('1');
  not_distracted = (count/all)*100;
  console.log(not_distracted, '%');
  data_list = [];
  console.log(data_list)
  io.emit('percentage', `${not_distracted}%`)
}

function populateArray(data){
  console.log(data);
  data_list.push(data.value);
  console.log(data_list)
}
setInterval(() => computeAndClear(data_list), 10000);

io.on('connection', (socket) => {
  console.log(Object.keys(srvSockets).length);
  socket.on('data', (data) => {
    // console.log(data);
    populateArray(data);
  });

  socket.on('face', (face_data) => {
    populateArray(face_data);
  });
  socket.on('microphone', (mic_data) => {
    populateArray(mic_data);
  });
  socket.on('accelerometer', (acc_data) => {
    populateArray(acc_data);
  });
});