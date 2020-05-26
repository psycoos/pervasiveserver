var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var createError = require('http-errors');

const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', () => {
  console.log('a user is connected');
})

app.post('/send_data', (req, res) => {
  io.emit('sensed_data', req.body.value);
  res.sendStatus(200);
})

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
