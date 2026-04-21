import { createLogger, format, transport, transports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import config from '@/config';

//Initialize an array to hold all configure Winston transports

const transportation: transport[] = [];

if (!config.LOGTAIL_SOURCE_TOKEN || !config.LOGTAIL_INGESTING_HOST) {
  throw new Error('Logtail source token or ingesting host ismissing');
}

const logtail = new Logtail(config.LOGTAIL_SOURCE_TOKEN, {
  endpoint: config.LOGTAIL_INGESTING_HOST,
});

if (config.NODE_ENV === 'production') {
  transportation.push(new LogtailTransport(logtail));
}

// Destructure logging format utilities from winston
const { colorize, combine, timestamp, label, printf } = format;

// IN development environment use console logging for real time feedback
if (config.NODE_ENV === 'development') {
  transportation.push(
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp(),
        label(),
        timestamp({ format: 'DD MMMM hh:mm:ss A' }),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
  );
}

// Create a winston logger with the selected transports
const logger = createLogger({
  transports: transportation,
});

export { logtail, logger };
