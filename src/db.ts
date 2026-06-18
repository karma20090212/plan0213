import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: 'root',
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME || 'wealth_db',
  port: Number(process.env.DB_PORT) || 3306,
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
    if (error instanceof Error) {
      console.error('エラー:', error.message);
    }
  }
};

export default pool;