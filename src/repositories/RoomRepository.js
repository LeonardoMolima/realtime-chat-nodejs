const db = require('../config/database');

class RoomRepository {
    async create({ name, isGroup = true }) {
        const query = `
        INSERT INTO rooms (name, is_group)
        VALUES ($1, $2)
        RETURNING id, name, is_group, created_at; -- Retorna os dados do chat room
        `;

        const { rows } = await db.query(query, [name, isGroup]);
        return rows[0];
    }

    async addUserToRoom({ userId, roomId }) {
        const query = `
        INSERT INTO participants (user_id, room_id)
        VALUES ($1, $2)
        RETURNING user_id, room_id, joined_at; -- Retorna os dados de quando o usuário entrou no chat room
        `;

        const { rows } = await db.query(query, [userId, roomId]);
        return rows[0];
    }

    async findUserRooms({ userId }) {
        const query = `
        SELECT rooms.* 
        FROM rooms
        INNER JOIN participants ON rooms.id = participants.room_id
        WHERE participants.user_id = $1;
        `;

        const { rows } = await db.query(query, [userId]);
        return rows;
    }

    async findDirectRoom(userId1, userId2) {
        const query = `
            SELECT r.* 
            FROM rooms r
            JOIN participants p1 ON r.id = p1.room_id
            JOIN participants p2 ON r.id = p2.room_id
            WHERE r.is_group = false 
              AND p1.user_id = $1 
              AND p2.user_id = $2;
        `;
        const { rows } = await db.query(query, [userId1, userId2]);
        return rows[0]; // Retorna a sala se existir, ou undefined
    }
}

module.exports = new RoomRepository();
