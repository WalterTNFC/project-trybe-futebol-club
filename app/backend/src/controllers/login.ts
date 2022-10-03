import { Request, Response } from 'express';
import * as User from '../services/login';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { code, error, token } = await User.login(email, password);

  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json({ token });
}

export default login;