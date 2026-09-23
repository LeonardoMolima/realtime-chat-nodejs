const messageService = require('../services/MessageService');

class MessageController {
    async listByRoom(req, res) {
        try {
            const roomId = req.params.roomId;
            const result = await messageService.getRoomMessages(roomId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new MessageController();
