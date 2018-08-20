const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public/');
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

//express middleware to user public path
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connection');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chap App'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Sent from server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});

var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Started up server on port ${port}`);
});