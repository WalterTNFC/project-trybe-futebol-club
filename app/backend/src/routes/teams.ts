import { Router } from 'express';
import * as userControllers from '../controllers/teams';

const router = Router();

router.get('/', userControllers.getAllTeam);

export default router;
