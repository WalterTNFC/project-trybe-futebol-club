import { Router } from 'express';
import * as userControllers from '../controllers/login';

const router = Router();

router.post('/', userControllers.login);
router.get('/validate', userControllers.loginValidate);

export default router;
