import { Request, Response } from 'express';
import * as User from '../services/login';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { code, error, token } = await User.login(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json({ token });
}

export async function loginValidate(req: Request, res: Response) {
  const { authorization: token } = req.headers;
  const { code, error, data } = await User.loginValidate(token);

  if (error) {
    res.status(code).json({ messge: error });
  }
  return res.status(code).json({ role: data });
}

export default login;
