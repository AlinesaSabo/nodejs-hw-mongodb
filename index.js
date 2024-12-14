import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/validation/server.js';
import path from 'node:path';

initMongoConnection().then(() => setupServer());
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
