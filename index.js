import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/validation/server.js';
// import path from 'node:path';

initMongoConnection().then(() => setupServer());
// export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
// export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
// export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// const bootstrap = async () => {
//   await initMongoDB();
//   await createDirIfNotExists(TEMP_UPLOAD_DIR);
//   await createDirIfNotExists(UPLOAD_DIR);
//   startServer();
// };

// void bootstrap();

// export const CLOUDINARY = {
//   CLOUD_NAME: 'CLOUD_NAME',
//   API_KEY: 'API_KEY',
//   API_SECRET: 'API_SECRET',
// };
