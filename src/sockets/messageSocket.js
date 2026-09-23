const messageService = require('../services/MessageService');

module.exports = (io, socket) => {
    // Entrar na sala
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`[socket.io] Socket ${socket.id} entrou na sala: ${roomId}`);
    });

    //Enviar mensagem
    socket.on('sendMessage', async (data) => {
        try {
            const { roomId, userId, content } = data;

            const message = await messageService.saveMessage(roomId, userId, content);

            if (!message) return;

            io.to(roomId).emit('newMessage', message);
        } catch (error) {
            console.error('[socket.io] Erro ao enviar mensagem:', error.message);
        }
    });
};