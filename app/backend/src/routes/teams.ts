import { Router } from 'express';
import * as teamsControllers from '../controllers/teams';

const router = Router();

router.get('/', teamsControllers.getAllTeam);
router.get('/:id', teamsControllers.getTeamById);

export default router;
