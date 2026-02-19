import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { initDb } from './db';
import tasksRouter from './routes/tasks';
import { apiKeyAuth } from './middleware/authMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));
app.use(helmet());

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/tasks', apiKeyAuth, tasksRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Task API is running!' });
});

if (process.env.NODE_ENV !== 'test') {
  initDb();
}

export default app;
