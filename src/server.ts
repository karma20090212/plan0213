import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import assetRoutes from './routes/assetRoutes';

dotenv.config();

const app = express();
const port = 3000;

// --- 1. 中间件配置 (Middleware) ---
app.use(cors()); // 必须在路由之前
app.use(express.json());

// --- 2. Swagger 配置 ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wealth Tracker API',
      version: '1.0.0',
      description: '资产管理系统后端 API 文档',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts', './src/server.ts'], // 确保路径包含 routes 目录
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- 3. 路由挂载 (Routes) ---
app.get('/', (req: Request, res: Response) => {
  res.send('✅ Wealth Tracker Backend is Alive on port 3000');
});

app.use('/api/assets', assetRoutes);

// --- 4. 启动服务 (Start Server) ---
// 只保留一个 app.listen，删除重复的那个
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend is running on: http://localhost:${port}`);
  console.log(`📖 Swagger Docs: http://localhost:${port}/api-docs`);
});