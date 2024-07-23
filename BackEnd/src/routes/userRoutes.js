import { Router } from 'express';
import userController from '../controllers/UserController';
// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Rota para login
router.post('/login', userController.login);

// Rotas de usuário
router.post('/register', userController.store); // Altere de '/' para '/register'
// router.get('/:id', userController.show); // Lista um usuário específico
// router.put('/', loginRequired, userController.update);
// router.delete('/', loginRequired, userController.delete);

export default router;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza informações de um usuário -> PATCH ou PUT
*/
