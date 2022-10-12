import { Request, Response } from 'express';
import * as leaderBoardService from '../services/leaderboard';

export async function getLeaderBoard(_req: Request, res: Response) {
  const result = await leaderBoardService.getLeaderBoard('home');
  return res.status(200).json(result);
}

export default getLeaderBoard;
