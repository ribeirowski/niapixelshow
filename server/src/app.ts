import dotenv from 'dotenv';
import routes from './routes';
import express, { Express } from 'express';
import { errorHandler } from './middlewares';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

export default app;