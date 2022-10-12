import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(400).json({
      message: 'Token not found',
    });
  }
  try {
    jwt.verify(token, 'jwt_secret');
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token must be a valid token',
    });
  }
};

export default auth;
