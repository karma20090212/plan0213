import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import assetRoutes from './routes/assetRoutes';
import cors from 'cors';


dotenv.config();

const app = express();
const port = 3000;

app.use('/api/assets', assetRoutes);

app.use(cors());

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend is running on port ${port}`);
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Running" });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Express Backend: http://localhost:3000');
  console.log('📖 Swagger Docs: http://localhost:3000/api-docs');
});

app.get('/', (req, res) => {
  res.send('Backend is Alive on 3000');
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wealth Tracker API',
      version: '1.0.0',
      description: '资本管理系统终端API文本',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/*.ts', './*.ts'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));