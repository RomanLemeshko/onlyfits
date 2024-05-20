require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const allProgramAndFilter = require('./routes/api.program');
const allUserProgAddDeleteprog = require('./routes/api.user.programs');
const userMacros = require('./routes/api.user.macros');
const allUserProgExcersises = require('./routes/api.user.programs.exercises');
const allRecipies = require('./routes/api.all.recepies');
const messageRouter = require('./routes/messages.routes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST,
    methods: ["GET", "POST"],
    credentials: true,
  }
})

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let messages = [];

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/api', allProgramAndFilter);
app.use('/api', allUserProgAddDeleteprog);
app.use('/api', userMacros);
app.use('/api', allUserProgExcersises);
app.use('/api', allRecipies);
app.use('/api/messages', messageRouter(messages));

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
  socket.emit('initial messages', messages);

  socket.on('chat message', (msg) => {
    console.log('Received chat message:', msg);
    messages.push(msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});