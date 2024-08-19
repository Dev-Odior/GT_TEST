import authConfig from '@src/config/auth.config';

import { User } from '@src/models/user.model';

import jwt from 'jsonwebtoken';

class JWTUtils {
  static createJwt(user: Partial<User>) {
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      authConfig.JWT_SECRET,
      { expiresIn: authConfig.EXPIRE_TIME, algorithm: 'HS256' },
    );

    return token;
  }

  static verifyToken(token: string) {
    const payload = jwt.verify(token, authConfig.JWT_SECRET);
    return payload;
  }
}

export default JWTUtils;
