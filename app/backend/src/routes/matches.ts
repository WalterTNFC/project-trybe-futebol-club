import { Router } from 'express';
import auth from '../middlewares/auth';
import * as matchesControllers from '../controllers/match';

const router = Router();

router.get('/', matchesControllers.getAllMatches);
router.post('/', auth, matchesControllers.createMatch);
router.patch('/:id/finish', matchesControllers.finishMatch);

export default router;
