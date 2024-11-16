import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use((req, res, next) => {
    const logger = pino();
    logger.info(`${req.method} ${req.url}`);
    next();
  });
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
