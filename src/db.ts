import mysql from 'mysql2/promise';

// 因为你目前没有 .env 文件，直接在这里填入你的 Docker 数据库信息
const pool = mysql.createPool({
  host: '127.0.0.1',        // 或者 'localhost'
  user: 'root',
  password: 'password123', // 👈 关键点：请务必填入你在 Docker 启动时设置的那个密码
  database: 'wealth_db',     // 👈 注意：这里要改成你实际在 MySQL 里创建的数据库名
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
      console.error('错误详情:', error.message);
    }
  }
};

export default pool;