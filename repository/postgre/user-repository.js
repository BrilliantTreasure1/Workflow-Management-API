const pool = require("../../config/db");

class UserRepositoryPostgres {

    async create(user) {
        const query = `
            INSERT INTO users (full_name, email, password_hash, created_at)
            VALUES ($1, $2, $3, $4)
            RETURNING id, full_name, email, password_hash, created_at
        `;

        const values = [
            user.fullName,
            user.email,
            user.passwordHash,
            user.createdAt
        ];

        const result = await pool.query(query, values);

        const row = result.rows[0];

        return {
            id: row.id,
            fullName: row.full_name,
            email: row.email,
            passwordHash: row.password_hash,
            createdAt: row.created_at
        };
    }

    async getUserById(id) {
        const query = `
            SELECT id, full_name, email, password_hash, created_at
            FROM users
            WHERE id = $1
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return {
            id: row.id,
            fullName: row.full_name,
            email: row.email,
            passwordHash: row.password_hash,
            createdAt: row.created_at
        };
    }

    async getUserByEmail(email) {
        const query = `
            SELECT id, full_name, email, password_hash, created_at
            FROM users
            WHERE email = $1
        `;

        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return {
            id: row.id,
            fullName: row.full_name,
            email: row.email,
            passwordHash: row.password_hash,
            createdAt: row.created_at
        };
    }
}

module.exports = UserRepositoryPostgres;
