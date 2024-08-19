import { User } from '@src/models/user.model';

import userService from './user.service';

import { BadRequestError } from '@src/error';
import tokenService from './token.service';

class AuthService {
  public async register(data: User) {
    const { email, username } = data;

    const user = await userService.getByEmail(email);

    if (user) {
      throw new BadRequestError('User already exists!');
    }

    const newUser = await userService.createUser(data);

    const token = tokenService.generateAccessToken(newUser);

    return { user: newUser, token };
  }

  public async login(data: User) {
    const { email, password } = data;

    const user = await userService.getByEmail(email, true);

    const validPassword = userService.verifyUserPassword(
      user.password,
      password,
    );

    if (!validPassword) {
      throw new BadRequestError(`Email or password is not valid!`);
    }

    const removePassword = userService.removePassword(user);
    const token = tokenService.generateAccessToken(removePassword);

    return { user: removePassword, token };
  }
}

export default new AuthService();
