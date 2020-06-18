const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 5000)
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/views/dashboard.html');
})

// io.emit('client_count', srvSockets)

data_list = [];
phone_users_list = [];
pc_users_list = [];

function computeAndClear(list) {
  all = list.length;
  count = 0;
  // count = list.length - list.sort().indexOf(1);
  // maybe keep it simple because javascript? test this pl0x
  list.forEach(el => {
    if (el == 1) count++;
  });
  distracted = (count / all) * 100;
  console.log(distracted, '%');
  data_list = [];
  console.log(data_list)
  io.emit('percentage', `${distracted}%`)
}

function populateArray(data) {
  console.log(data);
  data_list.push(data);
  console.log(data_list)
}
setInterval(() => computeAndClear(data_list), 10000);

io.on('connection', (socket) => {
  io.emit('client_count', Object.keys(io.sockets.sockets).length);
  socket.on('data', (data) => {
    console.log('this is data', data);
    populateArray(data);
  });
  socket.on('phone', () => {
    phone_users_list.push(socket);
    io.emit('phone_count', phone_users_list.length);
  });
  socket.on('computer', () => {
    pc_users_list.push(socket);
    io.emit('pc_count', pc_users_list.length);
  });
  socket.on('disconnect', function () {
    io.emit('client_count', Object.keys(io.sockets.sockets).length);
    if (phone_users_list.indexOf(socket) > -1) {
      phone_users_list.splice(phone_users_list.indexOf(socket), 1);
      io.emit('phone_count', phone_users_list.length);
    } else {
      pc_users_list.splice(pc_users_list.indexOf(socket), 1);
      io.emit('pc_count', pc_users_list.length);
    }
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