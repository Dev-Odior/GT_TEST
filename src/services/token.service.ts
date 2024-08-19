import { User } from '@src/models/user.model';

import JWTUtils from '@src/utils/helpers/jwt.helper';

class TokenService {
  public generateAccessToken(user: Partial<User>) {
    const token = JWTUtils.createJwt(user);
    return token;
  }


}


export default new TokenService()