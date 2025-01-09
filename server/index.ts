import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { userRouter } from './routes';
import { errorHandler, notFound } from './middleware';
import { scheduler } from './utils';
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

scheduler();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome Back');
});

app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
