/// <reference path="./types/express.d.ts" />
import 'dotenv/config';
import { log, error } from 'node:console';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorMiddleware from './middlewares/error';
import notFoundHandler from './middlewares/notFound';
import authMiddleware from './middlewares/auth';
import authRouter from './routes/auth';
import User from './models/user';
import { requestLogger, errorLogger } from './middlewares/logger';

const dbUrl = process.env.MONGODB_URL ?? 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(authRouter);
app.use('/users', authMiddleware, usersRouter);
app.use('/cards', authMiddleware, cardsRouter);

app.use(errorLogger);

app.use(notFoundHandler);

app.use(errors());
app.use(errorMiddleware);

mongoose.connect(dbUrl)
  .then(async () => {
    await User.syncIndexes();

    app.listen(PORT, () => {
      log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => error('Failed to connect to MongoDB, server not started', err));
