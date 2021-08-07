const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const UserController = require('./controllers/userController');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const userController = new UserController();

app.use(cors());

app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send("<h1>Server is up and running.</h1>");
});

io.on('connect', (socket) => {
  socket.on('join', async ({ name, room }, callback) => {
    try {
      const userExists = await userController.findUser({ name, room });
      if (userExists) {
        if (userExists.err) {
          callback(userExists.err);
        } else {
          callback(`User '${name}' already exists in room '${room}'. Please select a different name or room.`);
        }
      } else {
        const user = await userController.addUser({ _id: socket.id, name, room });
        if (user && !user.err) {
          socket.join(user.room);
          socket.emit('message', {
            user: 'Admin',
            text: `${user.name}, Welcome to room ${user.room}.`
          });
          socket.broadcast.to(user.room).emit('message', {
            user: 'Admin',
            text: `${user.name} has joined`,
          });
          const users = await userController.getUsersInRoom({ room: user.room });
          if (!users.err) {
            io.to(user.room).emit('roomData', {
              room: user.room,
              users
            });
          }
        } else {
          callback(user.err);
        }
      }
      callback();
    } catch (err) {
      callback(`Unable to add user at this moment. Please try again!`);
    }
  });
  socket.on('sendMessage', async (message, callback) => {
    const user = await userController.getUser({ _id: socket.id });
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });
  socket.on('disconnect', async () => {
    const user = await userController.getUser({ _id: socket.id });
    if (user) {
      await userController.removeUser({ _id: socket.id });
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      const users = await userController.getUsersInRoom({ room: user.room });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));