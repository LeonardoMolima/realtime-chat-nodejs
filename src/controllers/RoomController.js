const roomService = require('../services/RoomService');

class RoomController {
    async createGroup(req, res) {
        try {
            const { name } = req.body;
            const room = await roomService.createGroupRoom(req.userId, name);
            return res.status(201).json(room);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async createDirect(req, res) {
        try {
            const { targetUserId } = req.body;
            const room = await roomService.getOrCreateDirectRoom(req.userId, targetUserId);
            return res.status(201).json(room);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const rooms = await roomService.getUserRooms(req.userId);
            return res.status(200).json(rooms);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new RoomController();
