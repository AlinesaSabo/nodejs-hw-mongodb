import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { notFoundHandler } from '../middlewares/notFoundHandle.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import router from '../routers/index.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

const swaggerDoc = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json'), 'utf-8'),
);

export function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
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
