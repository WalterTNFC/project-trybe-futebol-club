import * as bcrypt from 'bcryptjs';
import { error } from 'console';

export default async function decrypt(hash: string, password: string): Promise<void> {
  const check = await bcrypt.compare(password, hash);
  if (!check) {
    return error({ code: 401, message: 'Unauthorized user' });
  }
}
