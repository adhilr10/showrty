import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import config from './config';
import corsOptions from './lib/cors';
import router from './routes';
import { logger, logtail } from './lib/winston';

const server = express();

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(`${__dirname}/public`));
server.use(cookieParser());
server.use(compression());

server.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

// IIFE
(async function (): Promise<void> {
  try {
    server.use('/', router);

    server.listen(config.PORT, () => {
      logger.info(`Server listening at http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error('Failed start the server', err);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

// Handles graceful server shutdown on termination signal
const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    // Disconnect from database
    // await disconnectDatabase();
    // Log a warning indicating the server is shutting down
    logger.info('Server shutdown', signal);

    // flush any remaining logs to Logtail before existing
    logtail.flush();
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown', err);
  }
};

// listen for Termination signals and trigger grateful shutdown
process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
