import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import serverConfig from '@src/config/server.config';
import authService from '@src/services/auth.service';

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);

      res.status(StatusCodes.OK).json({
        message: 'Account Created Successful, Check Mail to Verify Password',
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Register Method, Auth Controller ${error}`,
      );
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.login(req.body);

      res.status(StatusCodes.OK).json({
        message: 'User login Successfully',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Login Method, Auth Controller ${error}`,
      );
      next(error);
    }
  }
}

export default AuthController;
