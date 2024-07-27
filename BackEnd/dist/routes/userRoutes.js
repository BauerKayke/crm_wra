"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const router = _express.Router.call(void 0, );

// Rota para registrar um novo usuário
router.post('/register', _UserController2.default.store);

// Rota para login do usuário
router.post('/login', _UserController2.default.login);

// Rota para validar o código de ativação do usuário
router.post('/validate', _UserController2.default.validateAccount);

exports. default = router;
