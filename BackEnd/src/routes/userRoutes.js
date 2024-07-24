import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// Rota para registrar um novo usuário
router.post('/register', UserController.store);

// Rota para login do usuário
router.post('/login', UserController.login);

// Rota para validar o código de ativação do usuário
router.post('/validate', UserController.validateAccount);

export default router;
