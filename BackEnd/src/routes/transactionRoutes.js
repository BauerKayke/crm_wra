// routes/transactionRoutes.js

import { Router } from 'express';
import transactionController from '../controllers/TransactionController';
// import authenticateToken from '../middlewares/authMiddleware';

const router = new Router();

router.post('/', transactionController.store); // Criar uma nova transação
router.get('/', transactionController.index); // Listar todas as transações
router.get('/:id', transactionController.show); // Mostrar uma transação específica
router.put('/update/:id', transactionController.update); // Atualizar uma transação
router.delete('/delete/:id', transactionController.delete); // Deletar uma transação

export default router;
