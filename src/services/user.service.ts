import { BadRequestError, NotFoundError } from '@src/error';

import BCRYPTHelper from '@src/utils/helpers/bcrypt.helper';

import { User } from '@src/models/user.model';

class UserService {
  public async getByEmail(email: string, withError = false) {
    const user = await User.scope().findOne({ where: { email } });

    console.log(`${user}`);

    if (!user && withError) {
      throw new NotFoundError('User does not exist!');
    }

    return user;
  }

  public async uniqueUsername(username: string, withError = false) {
    const user = await User.findOne({ where: { username } });

    if (user && withError) {
      throw new BadRequestError('Username must be unique');
    }

    return user!!;
  }

  public async createUser(data: User) {
    await this.uniqueUsername(data.username, true);

    const createdUser = await User.create(data);
    const user = this.removePassword(createdUser);
    return user;
  }

  public removePassword(user: User) {
    const { password, ...others } = user.toJSON();
    const userWithoutPassword = others as User;
    return userWithoutPassword;
  }

  public verifyUserPassword(hashedPassword: string, password: string) {
    const isValid = BCRYPTHelper.comparePassword(password, hashedPassword);
    return isValid;
  }
}

export default new UserService();
