import expressWinston from 'express-winston';
import path from 'node:path';
import winston from 'winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.resolve('logs', 'request.log') }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.resolve('logs', 'error.log') }),
  ],
  format: winston.format.json(),
});
