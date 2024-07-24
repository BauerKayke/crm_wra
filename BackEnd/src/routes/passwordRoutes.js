import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';

const router = Router();

// Rota para enviar o código de redefinição de senha
router.post('/forgotpassword', PasswordController.forgotPassword);

// Rota para verificar o código de redefinição de senha
router.post('/verify-code', PasswordController.verifyCode);

// Rota para redefinir a senha
router.post('/reset-password', PasswordController.resetPassword);

export default router;
