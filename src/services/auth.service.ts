import { User } from '@src/models/user.model';

import userService from './user.service';

import { BadRequestError } from '@src/error';
import tokenService from './token.service';

import notificationClient from '@src/clients/notification.client';

import serverConfig from '@src/config/server.config';

import { EmailAttributeI } from '@src/interfaces/email.inteface';

class AuthService {
  public async removePassword(data: User) {
    const { password, ...others } = data.toJSON();
    return { others };
  }

  public async register(data: User) {
    const { email, username } = data;

    const user = await userService.getByEmail(email);

    if (user) {
      throw new BadRequestError('User already exists!');
    }

    const newUser = await userService.createUser(data);

    const token = tokenService.generateAccessToken(newUser);

    const verifyLink = `http://localhost:${serverConfig.PORT}/?uid=${newUser.id}&token=${token}&email=${email}`;

    const emailPayload: EmailAttributeI = {
      to: email,
      subject: 'Verify your email',
      templateName: 'verifyAccount',
      replacements: { userName: username, email, verifyLink },
    };

    await notificationClient.sendNotification('mail', emailPayload);

    return { user: true };
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
