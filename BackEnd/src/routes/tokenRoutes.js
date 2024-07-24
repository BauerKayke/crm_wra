import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

router.get('/', tokenController.index);
export default router;
