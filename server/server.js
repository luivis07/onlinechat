const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5000;
app.use(cors());

const server = http.createServer(app);
let roomId = 0;
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const rooms = [];

io.on('connection', (socket) => {
    socket.emit('roomList', rooms);

    socket.on('joinRoom', (id) => {
        socket.join(id);
    });
    socket.on('leaveRoom', (id) => {
        socket.leave(id);
    });
    socket.on('message', (message) => {
        const newMessage = {
            ...message,
            displayTime: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        io.to(message.id).emit('message', newMessage);
    });
    socket.on('createRoom', (message) => {
        const newRoom = {
            ...message,
            id: ++roomId
        }
        rooms.push(newRoom);
        io.emit('roomList', rooms);
        socket.emit('roomCreated', newRoom);
    })
});

server.listen(PORT, () => "Server is running on port " + PORT);