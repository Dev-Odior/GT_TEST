import serverConfig from '@src/config/server.config';
import { Request, Response, NextFunction } from 'express';

class MeController {
  public async verifyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { id, token },
      } = req;
    } catch (error) {
      serverConfig.DEBUG(`Error at Me Controller, Verify Self Method ${error}`);
      next(error);
    }
  }
}
