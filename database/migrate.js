//database/migrate.js
const pool = require("../config/db");

async function migrate() {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log("✅ Users table created");

    await pool.end();

  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();