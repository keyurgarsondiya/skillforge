import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    const connectionURI = process.env.MONGO_URI;
    console.log('Connection URI: ', connectionURI);
    const conn = await mongoose.connect(process.env.MONGO_URI || '', {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Connected: ', conn.connection.host);
  } catch (error: any) {
    console.log('Error in connection: ', (error as Error).message);
    if (error.name === 'MongoServerSelectionError') {
      console.log('Additional error details:', error.reason);
    }
    process.exit(1);
  }
};
