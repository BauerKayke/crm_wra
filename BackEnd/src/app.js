import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import delay from 'express-delay';
import dotenv from 'dotenv';

import './database';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import transactionRoutes from './routes/transactionRoutes'; // Nova rota

dotenv.config();

const whiteList = [
  'http://localhost:3000',
  'http://localhost:4200',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
    this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/transactions/', transactionRoutes); // Nova rota
  }
}

export default new App().app;
