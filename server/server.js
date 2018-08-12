const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname, '../public/');

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

//express middleware to user public path
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connection');

    socket.emit('newMessage', {
        from: 'Ali',
        text: 'Meetup at 6 pm',
        createdAt: 323
    })

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});

var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Started up server on port ${port}`);
});