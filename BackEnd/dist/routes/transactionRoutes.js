"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// routes/transactionRoutes.js

var _express = require('express');
var _TransactionController = require('../controllers/TransactionController'); var _TransactionController2 = _interopRequireDefault(_TransactionController);
// import authenticateToken from '../middlewares/authMiddleware';

const router = new (0, _express.Router)();

router.post('/', _TransactionController2.default.store); // Criar uma nova transação
router.get('/', _TransactionController2.default.index); // Listar todas as transações
router.get('/:id', _TransactionController2.default.show); // Mostrar uma transação específica
router.put('/update/:id', _TransactionController2.default.update); // Atualizar uma transação
router.delete('/delete/:id', _TransactionController2.default.delete); // Deletar uma transação

exports. default = router;
