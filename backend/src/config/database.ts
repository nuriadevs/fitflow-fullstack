import mongoose from 'mongoose';
//import dotenv from 'dotenv';
import * as dotenv from 'dotenv';


dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_db';

export const connectDB = async () => {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
}; 

export { mongoose };
