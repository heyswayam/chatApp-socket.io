
// import the 'socket.io' library
import { Server } from "socket.io";

// create a Node.js http server and pass it to socket.io
const io = new Server({ 
  cors:"*" //cors : for allowing this url to connect with localhost:3005
});

// listen for incoming connections
io.on("connection", (socket) => {
  socket.on("user-joined", (userName) => {
    console.log(`${userName} joined the chat`);
  });
  socket.on("send", (message,userName) => {
    console.log(message);
    const data={message: message,named:userName}
    socket.broadcast.emit("receive", (data));
  });

});

// start the server and listen on port 3005
io.listen(3000, () => {
  console.log("Server listening on port 3005");
});
