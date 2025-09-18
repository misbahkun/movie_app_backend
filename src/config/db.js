import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const connectDB = async () => {
	try {
		const uri = process.env.NODE_ENV === 'test' ? globalThis.__MONGO_URI__ : ENV_VARS.MONGO_URI;

		const clientOptions = {
			serverApi: { version: '1', strict: true, deprecationErrors: true },
		};

		if (ENV_VARS.NODE_ENV == "development-proxy") {
			clientOptions.proxyHost = '127.0.0.1'
			clientOptions.proxyPort = 10808
		}

		if (!uri) {
			throw new Error('MongoDB URI is not defined');
		}

		const conn = await mongoose.connect(uri, clientOptions);

		if (ENV_VARS.NODE_ENV === 'development-proxy' || ENV_VARS.NODE_ENV === 'development') {
			console.log('Connecting to MongoDB URI:', uri);
		}
		console.log('MongoDB connected: ' + conn.connection.host);
	} catch (error) {
		console.error('Error connecting to MongoDB: ' + error.message);
		process.exit(1);
	}
};