import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '5mb' }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

  app.use('/api/v1', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
