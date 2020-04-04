"use strict";
const express = require("express");
const socket = require("socket.io");

const app = express();

const port = app.get("port") || 4000;

app.use(express.static("public"));

const server = app.listen(port, () => {
   console.log(`listening to requests on port ${port}`);
});


const io = socket(server);

io.on("connection", (socket) => {

   // Handle chat event
   socket.on("chat", (data) => {
      io.sockets.emit("chat", data);
   });

   socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);
   })
});

