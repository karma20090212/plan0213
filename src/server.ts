import 'dotenv/config';
import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import assetRoutes from './routes/assetRoutes';


dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
  apis: ['./src/routes/*.ts', './src/server.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req: Request, res: Response) => {
  res.send('✅ Wealth Tracker Backend is Alive on port 3000');
});

app.use('/api/assets', assetRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend is running on: http://localhost:${port}`);
  console.log(`📖 Swagger Docs: http://localhost:${port}/api-docs`);
});