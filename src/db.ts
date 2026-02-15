import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: String(process.env.DB_PASSWORD || ''),
  database: process.env.DB_NAME || 'wealth_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const checkConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ [Database]: Connected to MySQL successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ [Database]: Connection failed!');
    if (error instanceof Error) console.error(error.message);
  }
};

export default pool;