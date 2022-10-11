import { Request, Response } from 'express';
import * as Match from '../services/matches';

export async function getAllMatches(_req: Request, res: Response) {
  const { code, data } = await Match.getAllMatches();
  return res.status(code).json(data);
}

export default getAllMatches;
