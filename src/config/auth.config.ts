import { config } from 'dotenv';

config();

class AuthConfig {
  public SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
  public JWT_SECRET = process.env.JWT_SECRET;
  public EXPIRE_TIME = process.env.EXPIRE_TIME;
}

export default new AuthConfig();
