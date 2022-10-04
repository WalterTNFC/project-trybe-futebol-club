import decrypt from '../helpers/decryptPassword';
import User from '../database/models/user';
import { getToken, getTokenId } from '../helpers/getToken';

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  console.log(password);
  if (!user) {
    return { code: 401, error: 'Incorrect email or password' };
  }

  await decrypt(user.password, password);

  const { id, username } = user;

  const token = getToken({ id, username, password, email });
  return { code: 200, token };
}

export async function loginValidate(token: string | undefined) {
  if (token === undefined) {
    return { code: 400, error: 'Incorret Token' };
  }

  const tokenId = getTokenId(token);

  const { role } = await User.findOne({ where: { tokenId } }) as User;

  return { code: 200, data: role };
}

export default login;
