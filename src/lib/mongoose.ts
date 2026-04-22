import mongoose from 'mongoose';
import { logger } from '@/lib/winston';

import type { ConnectOptions } from 'mongoose';
import config from '@/config';

const connectionOptions: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  dbName: 'showrty',
};

const connectDatabase = async (): Promise<void> => {
  if (!config.MONGO_CONNECTION_URI) {
    throw new Error('Mongo connection URI is missing');
  }
  try {
    await mongoose.connect(config.MONGO_CONNECTION_URI, connectionOptions);
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to database', error);
  }
};

const disconnectDatabase = async (): Promise<void> => {
  if (!config.MONGO_CONNECTION_URI) {
    throw new Error('Mongo connection URI is missing');
  }
  try {
    await mongoose.disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Error during disconnecting database', error);
  }
};

export { connectDatabase, disconnectDatabase };
