import { Router } from 'express';
import * as matchesControllers from '../controllers/match';

const router = Router();

router.get('/', matchesControllers.getAllMatches);

export default router;
