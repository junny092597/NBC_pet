"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
