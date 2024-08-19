import AuthController from '@src/controllers/auth.controller';
import authValidator from '@src/utils/validators/auth.validator';
import systemMiddleware from '@src/middleware/system.middleware';

import { Router } from 'express';

class AuthRoutes extends AuthController {
  public router: Router;
  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      '/register',
      systemMiddleware.validateRequestBody(authValidator.register),
      this.register,
    );

    this.router.post(
      '/login',
      systemMiddleware.validateRequestBody(authValidator.login),
      this.login,
    );
  }
}
export default new AuthRoutes().router;
