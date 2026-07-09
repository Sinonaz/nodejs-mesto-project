/// <reference path="./types/express.d.ts" />
import 'dotenv/config';
import { log, error } from 'node:console';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorMiddleware from './middlewares/error';
import notFoundHandler from './middlewares/notFound';

const dbUrl = process.env.MONGODB_URL ?? 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6a4b9de94164dd9282813247',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(notFoundHandler);

app.use(errors());
app.use(errorMiddleware);

mongoose.connect(dbUrl)
  .then(() => {
    app.listen(PORT, () => {
      log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => error('Failed to connect to MongoDB, server not started', err));
