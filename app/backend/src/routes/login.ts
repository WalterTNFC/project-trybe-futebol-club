import { Router } from 'express';
import * as userControllers from '../controllers/login';

const router = Router();

router.post('/', userControllers.login);

export default router;
