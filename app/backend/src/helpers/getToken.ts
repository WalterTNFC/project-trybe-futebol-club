import * as jwt from 'jsonwebtoken';

interface IToken {
  id: number,
  username: string,
  email: string,
  password: string,
}

export function getToken(payload: IToken): string {
  const token = jwt.sign(payload, 'jwt_secret');
  return token;
}

export function getTokenId(token: string): number {
  const { id } = jwt.verify(token, 'jwt_secret') as IToken;
  return id;
}
