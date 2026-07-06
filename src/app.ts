import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { log, error } from 'node:console';

const dbUrl = process.env.MONGODB_URL ?? 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT ?? 3000;
const app = express();

try {
  await mongoose.connect(dbUrl);
  log('Connected to MongoDB');
} catch (err) {
  error('Failed to connect to MongoDB', err);
}

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
