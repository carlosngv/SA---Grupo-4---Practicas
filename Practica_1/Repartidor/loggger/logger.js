const winston = require('winston');

const { timestamp, combine } = winston.format;

const { LOG_PATH, LOG_LEVEL, SERVICE_NAME } = {
  LOG_PATH: 'logs',
  LOG_LEVEL: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  SERVICE_NAME: 'LOGIN',
};

const logTransport = new winston.transports.File({
  level: LOG_LEVEL,
  filename: `${LOG_PATH}/info.logs`,
  handleExceptions: true,
  json: true,
  maxsize: 1024,
  maxFiles: 1,
});

const errorTransport = new winston.transports.File({
  level: 'error',
  filename: `${LOG_PATH}/error.logs`,
  handleExceptions: true,
  json: true,
  maxsize: 1024,
  maxFiles: 1,
});

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(timestamp(), winston.format.json()),
  defaultMeta: { service: SERVICE_NAME },
  transports: [logTransport, errorTransport],
});

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        winston.format.colorize(),
        winston.format.simple(),
        timestamp()
      ),
    })
  );
}

global.log = logger;
