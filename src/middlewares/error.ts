import {
  Request, Response, NextFunction,
} from 'express';
import AppError from '../errors/appError';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;

  return res.status(statusCode).send({
    message: isAppError ? err.message : 'Internal Server Error',
  });
}
