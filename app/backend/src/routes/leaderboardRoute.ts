import { Router } from 'express';
import * as leaderboardControllers from '../controllers/leaderboard';

const router = Router();

router.get('/home', leaderboardControllers.getLeaderBoard);

export default router;
