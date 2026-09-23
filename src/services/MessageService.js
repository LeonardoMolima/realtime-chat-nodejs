const messageRepository = require('../repositories/MessageRepository');

class MessageService {
    async saveMessage(roomId, userId, content) {
        //Garente que existe conteudo e que não seja apenas espaços vazios
        if (!content || content.trim() === 0) return null;

        const message = await messageRepository.create({ roomId: roomId, userId: userId, content: content });
        return message;
    }

    async getRoomMessages(roomId) {
        if (!roomId) throw new Error('ID da sala é obrigatório.');

        const messages = await messageRepository.findByRoom(roomId);
        return messages;
    }
}

module.exports = new MessageService();
