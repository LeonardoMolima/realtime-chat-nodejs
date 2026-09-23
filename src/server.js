require('dotenv').config();
require('./config/database');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

//sockets
const messageSocket = require('./sockets/messageSocket');

//Inicializa o Express
const app = express();

//Cria o servidor HTTP passando o Express
const server = http.createServer(app);

//Inicializa o Socket.io anexado ao servidor HTTP
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true, //Permite envio de cookies
  }
});

//Middlewares globais do Express
app.use(express.json()); //Para o Express entender JSON no body
app.use(cookieParser()); //Para conseguir ler o cookie do JWT
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//Rota de teste da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'API rodando perfeitamente!' });
});

//Socket.io
io.on('connection', (socket) => {
  console.log(`[socket.io] Novo usuário conectado: ${socket.id}`);

  // Registra todos os eventos de mensagem para esse socket
  messageSocket(io, socket);

  socket.on('disconnect', () => {
    console.log(`[socket.io] Usuário desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`[server] Servidor rodando na porta ${PORT}`);
});

// rota de autenticação
app.use('/api/auth', authRoutes);

// rota para chat rooms
app.use('/api/rooms', roomRoutes);

// rota para chat messages
app.use('/api/messages', messageRoutes);

// rota para users
app.use('/api/users', userRoutes);