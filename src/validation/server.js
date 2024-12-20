import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { notFoundHandler } from '../middlewares/notFoundHandle.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import router from '../routers/index.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';

export function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use('/photos', express.static(path.resolve('src/public/photos')));
  app.use(cors());
  app.use((req, res, next) => {
    const logger = pino();
    logger.info(`${req.method} ${req.url}`);
    next();
  });
  app.use(cookieParser());

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
