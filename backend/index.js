// server.js

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("create_poll", (data) => {
    socket.broadcast.emit("recieved", data)
  });

  socket.on("select_option", (answerIndex) => {
    socket.broadcast.emit('update_result', answerIndex);
  });

  socket.on("result", (data) => {
    console.log("result", data);
    socket.broadcast.emit('show_result', data);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
