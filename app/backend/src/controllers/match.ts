import { NextFunction, Request, Response } from 'express';
import * as Match from '../services/matches';

export async function getAllMatches(req: Request, res: Response) {
  const { code, data } = await Match.getAllMatches();
  return res.status(code).json(data);
}

export async function createMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  try {
    const { code, data, error } = await Match.createMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
    if (error) return res.status(code).json({ message: error });
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
}

export default getAllMatches;
