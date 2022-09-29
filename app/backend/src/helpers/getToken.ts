import * as jwt from 'jsonwebtoken';

interface IToken {
  id: number,
  username: string,
  email: string,
  password: string,
}

export default function getToken(payload: IToken): string {
  const token = jwt.sign(payload, 'secret');
  return token;
}
