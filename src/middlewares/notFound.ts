import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/appError';
import StatusCodes from '../enums/statusCodes';

export default function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new AppError(StatusCodes.NOT_FOUND, 'Requested route not found'));
}
