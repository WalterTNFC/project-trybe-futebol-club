import { Request, Response } from 'express';
import * as Team from '../services/teams';

export async function getAllTeam(req: Request, res: Response) {
  const { code, error, data } = await Team.getAllTeam();

  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
}

export async function getTeamById(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  const { code, error, data } = await Team.getTeamById(Number(id));
  console.log(data);

  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
}
export default getAllTeam;
