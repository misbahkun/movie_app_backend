import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const connectDB = async () => {
	try {
		const uri = process.env.NODE_ENV === 'test' ? globalThis.__MONGO_URI__ : ENV_VARS.MONGO_URI;
		if (!uri) {
			throw new Error('MongoDB URI is not defined');
		}
		console.log('Connecting to MongoDB URI:', uri);
		const conn = await mongoose.connect(uri);
		console.log('MongoDB connected: ' + conn.connection.host);
	} catch (error) {
		console.error('Error connecting to MongoDB: ' + error.message);
		process.exit(1);
	}
};