const express = require('express');
const app = express();
const path = require('path');
var http = require("http").createServer(app);
var io = require("socket.io")(server);
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname+ "/index.html")));


io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
}); // This will emit the event to all connected sockets

io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});



server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
