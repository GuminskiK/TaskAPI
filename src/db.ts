import { Pool } from 'pg';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  dotenv.config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

});


export const query = (text: string, params?: any[]) => pool.query(text, params);
export const end = () => pool.end();

export const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      is_completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Database initialized: "tasks" table is ready.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};
