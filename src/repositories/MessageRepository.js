const db = require('../config/database');

class MessageRepository {
    async create({ roomId, userId, content }) {
        const query = `
        INSERT INTO messages (room_id, sender_id, content)
        VALUES ($1, $2, $3)
        RETURNING id, room_id, sender_id, content, created_at;
        `;

        const { rows } = await db.query(query, [roomId, userId, content]);
        return rows[0];
    }

    async findByRoom(roomId) {
        const query = `
        SELECT * FROM messages WHERE room_id = $1 ORDER BY created_at ASC;
        `;

        const { rows } = await db.query(query, [roomId]);
        return rows;
    }
}

module.exports = new MessageRepository();
