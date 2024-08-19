import { NextFunction, Request, Response } from 'express';

import { Unauthorized, BadRequestError } from '@src/error';

import serverConfig from '@src/config/server.config';

import JWTUtils from '@src/utils/helpers/jwt.helper';

import { User } from '@src/models/user.model';
import { Role } from '@src/interfaces/user.interface';

class AuthMiddleWare {
  public checkAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        headers: { authorization },
      } = req;

      if (!authorization) {
        throw new BadRequestError('Access Denied!');
      }

      let token: string;

      if (authorization.startsWith(`Bearer `)) {
        token = authorization.split(' ')[1];
      } else {
        token = authorization;
      }

      const user = JWTUtils.verifyToken(token) as User;

      req.user = user;

      next();
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at the checkAccessToken method Auth middleware ${error}`,

        next(error),
      );
    }
  }

  public checkAuthorization(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user: { role },
      } = req;

      if (role === Role.User) {
        throw new Unauthorized('Access Denied!');
      }

      next();
    } catch (error) {
      serverConfig.DEBUG(
        `Error ocurred at Auth Middleware, Check Access Token Method: ${error}`,
      );
      next(error);
    }
  }

  public masterAuthorization(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user: { role },
      } = req;

      if (role !== Role.Manager) {
        throw new Unauthorized('Access Denied!');
      }

      next();
    } catch (error) {
      serverConfig.DEBUG(
        `Error ocurred at Auth Middleware, Check Access Token Method: ${error}`,
      );
      next(error);
    }
  }
}

export default new AuthMiddleWare();
