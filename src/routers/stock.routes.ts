import { Router } from 'express';

import authMiddleware from '@src/middleware/auth.middleware';
import systemMiddleware from '@src/middleware/system.middleware';

import stockValidator from '@src/utils/validators/stock.validator';
import StockController from '@src/controllers/stcok.controller';

class StockRoutes extends StockController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      '/',
      authMiddleware.checkAuthorization,
      systemMiddleware.validateRequestBody(stockValidator.create),
      this.create,
    );

    this.router.put(
      '/:stockId',
      authMiddleware.checkAuthorization,
      systemMiddleware.formatRequestParamsId('stockId'),
      systemMiddleware.validateRequestBody(stockValidator.update),
      systemMiddleware.rejectEmptyRequest,
      this.update,
    );

    this.router.delete(
      '/:stockId',
      authMiddleware.checkAuthorization,
      systemMiddleware.formatRequestParamsId('stockId'),
      this.delete,
    );

    this.router.get(
      '/:stockId',
      systemMiddleware.formatRequestParamsId('stockId'),
      this.get,
    );

    this.router.get('/', this.getAll);
  }
}

export default new StockRoutes().router;
