import mongoose from 'mongoose';
import 'dotenv/config';

export const initMongoConnection = async () => {
  console.log('MONGODB_USER:', process.env.MONGODB_USER);
  console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
  console.log('MONGODB_URL:', process.env.MONGODB_URL);
  console.log('MONGODB_DB:', process.env.MONGODB_DB);

  const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
