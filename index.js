const { LOADIPHLPAPI } = require("dns");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3001;
http.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const io = require("socket.io")(http);
let users = {};
var count=0
io.on("connection", (socket) => {
  count++
  console.log(socket.id,"is online");
  users[socket.id]=socket.id
  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message",msg);
  })
  socket.on('disconnect', () => {
    console.log(socket.id,'is offline');
    delete users[socket.id];
    count--
  console.log("total users online:-",count);
  });
  console.log("total users online:-",count);
})


////////////////////////////
// const ioo = require("socket.io-client");
// var sockett = ioo.connect("http://localhost:3001");
// let users={}
// sockett.once("connect", () => {
//   let userId=sockett.id
//   if (!users[userId]) users[userId] = [];

//   // PUSH SOCKET ID FOR PARTICULAR USER ID
//   users[userId].push(sockett.id);

//   // USER IS ONLINE BROAD CAST TO ALL CONNECTED USERS
//   io.sockets.emit("online", userId);

// // USER IS ONLINE
//   sockett.on("online", (userId) => {
//       console.log(userId, "Is Online!"); // update online status
//   });

//   sockett.on('disconnect', () => {

//     // REMOVE FROM SOCKET USERS
// console.log(sockett.id);
//     _.remove(users[userId], (u) => u === sockett.id);
//     if (users[userId].length === 0) {

//       // ISER IS OFFLINE BROAD CAST TO ALL CONNECTED USERS
//       io.sockets.emit("offline", userId);
//       // REMOVE OBJECT
//       delete users[userId];
//       // USER IS OFFLINE
//     }
//   socket.on("offline", (userId) => {
//     console.log(userId, "Is Offline!"); // update offline status
// });
//     socket.disconnect(); // DISCONNECT SOCKET

//   });
// })
