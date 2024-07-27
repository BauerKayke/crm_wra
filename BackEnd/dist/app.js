"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressdelay = require('express-delay'); var _expressdelay2 = _interopRequireDefault(_expressdelay);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

require('./database'); // Conecta ao banco de dados
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes); // Rotas para usuários
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes); // Rotas para tokens
var _transactionRoutes = require('./routes/transactionRoutes'); var _transactionRoutes2 = _interopRequireDefault(_transactionRoutes);
var _passwordRoutes = require('./routes/passwordRoutes'); var _passwordRoutes2 = _interopRequireDefault(_passwordRoutes); // Rotas para transações

_dotenv2.default.config(); // Carrega variáveis de ambiente

const whiteList = [
  'http://localhost:3000',
  'http://localhost:4200',
  'https://crmwra.netlify.app/' // Adiciona a URL do front-end ao whitelist
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
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, { crossOriginEmbedderPolicy: false }));
    this.app.use(_expressdelay2.default.call(void 0, 2000)); // Adiciona um atraso para simulação
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/users', _userRoutes2.default);
    this.app.use('/tokens', _tokenRoutes2.default);
    this.app.use('/transactions', _transactionRoutes2.default);
    this.app.use('/reset', _passwordRoutes2.default);
  }
}

exports. default = new App().app;
