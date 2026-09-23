const db = require('../config/database');

class UserRepository {
    async findByEmail(email) {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    }

    async findByUsername(username) {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return rows[0];
    }

    async create({ username, email, passwordHash }) {
        const query = `
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at; -- Retorna os dados, mas esconde a senha
        `;

        const { rows } = await db.query(query, [username, email, passwordHash]);
        return rows[0];
    }

    async findByILikeUsername({ searchName }) {
        const query = `
        SELECT id, username FROM users WHERE username ILIKE $1;
        `;

        const { rows } = await db.query(query, [`${searchName}%`]);
        return rows;
    };
}

module.exports = new UserRepository();
