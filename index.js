const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  connectionStateRecovery: {}
});

// Socket.io
io.on("connection", (socket) => {
    console.log('a user connected');
  socket.on("user-message", (message) => {
    console.log('message: ' + message);
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));