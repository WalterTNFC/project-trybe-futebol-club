import decrypt from '../helpers/decryptPassword';
import User from '../database/models/user';
import getToken from '../helpers/getToken';

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  console.log(password);
  if (!user) {
    return { code: 400, error: 'User not found' };
  }

  await decrypt(user.password, password);

  const { id, username } = user;

  const token = getToken({ id, username, password, email });
  return { code: 200, token };
}

export default login;
