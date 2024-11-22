import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/validation/server.js';

initMongoConnection().then(() => setupServer());
