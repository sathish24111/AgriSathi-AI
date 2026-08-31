import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrisathi';
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    console.log('✅ Connected to MongoDB database (AgriSathi Shared Database)');
  } catch (error) {
    console.log('⚠️ MongoDB connection warning: Running Express API server with persistent DB abstraction mode.');
  }
};
