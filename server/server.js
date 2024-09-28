const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const router = require("./routers/auth-router");
const connectDb = require("./utils/db");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

app.use(cookieParser('your-secret-key'));

app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:5173', // Adjust the origin as needed
  methods: ['GET', 'POST'],
  credentials: true, // Use if your requests include cookies or credentials
}));




app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", router);


// Create the HTTP server
const server = http.createServer(app);

// Create the Socket.IO server and attach it to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.broadcast.emit("callEnded");
  });

  socket.on('callUser', ({ userToCall, signal, from, name }) => {
    console.log(`Received callUser event from ${from} to ${userToCall}`);
    console.log('Signal data:', signal);
    io.to(userToCall).emit('callUser', { signal, from, name });
  });

  socket.on('answerCall', (data) => {
    console.log(`Received answerCall event from ${data.to}`);
    console.log('Signal data:', data.signal);
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});