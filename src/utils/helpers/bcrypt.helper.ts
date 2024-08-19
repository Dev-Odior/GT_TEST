import bcrypt from 'bcryptjs';
import authConfig from '@src/config/auth.config';

class BCRYPTHelper {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(authConfig.SALT_ROUNDS);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }

  static comparePassword(password: string, hashed: string) {
    const valid = bcrypt.compareSync(password, hashed);
    return valid;
  }
}

export default BCRYPTHelper;
