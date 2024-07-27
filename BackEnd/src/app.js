import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import delay from 'express-delay';
import dotenv from 'dotenv';

import './database'; // Conecta ao banco de dados
import userRoutes from './routes/userRoutes'; // Rotas para usuários
import tokenRoutes from './routes/tokenRoutes'; // Rotas para tokens
import transactionRoutes from './routes/transactionRoutes';
import passwordRoutes from './routes/passwordRoutes'; // Rotas para transações

dotenv.config(); // Carrega variáveis de ambiente

const whiteList = [
  'http://localhost:3000',
  'http://localhost:4200',
  'https://crmwra.netlify.app/',
  'http://localhost:54617/' // Adiciona a URL do front-end ao whitelist
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
    this.app.use(delay(2000)); // Adiciona um atraso para simulação
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/transactions', transactionRoutes);
    this.app.use('/reset', passwordRoutes);
  }
}

export default new App().app;
