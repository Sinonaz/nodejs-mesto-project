import { Request, Response, NextFunction } from 'express';

export default function successResponse(_req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send;
  const originalJson = res.json;

  const wrap = (body: unknown): unknown => (
    res.statusCode < 400 && body !== null && typeof body === 'object'
      ? { data: body }
      : body
  );

  res.send = function send(this: Response, body: unknown) {
    return originalSend.call(this, wrap(body));
  } as Response['send'];

  res.json = function json(this: Response, body: unknown) {
    return originalJson.call(this, wrap(body));
  } as Response['json'];

  next();
}
