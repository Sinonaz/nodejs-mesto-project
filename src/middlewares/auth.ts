import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../enums/statusCodes';
import AppError from '../errors/appError';

export default function authHandler(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError(statusCodes.UNAUTHORIZED, 'Authorization required'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'secret-key') as { _id: string };
    req.user = payload;

    return next();
  } catch {
    return next(new AppError(statusCodes.UNAUTHORIZED, 'Authorization required'));
  }
}
