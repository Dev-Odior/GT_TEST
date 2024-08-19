import { Router } from 'express';

import WarehouseController from '@src/controllers/warehouse.controller';

import authMiddleware from '@src/middleware/auth.middleware';
import systemMiddleware from '@src/middleware/system.middleware';

import warehouseValidator from '@src/utils/validators/warehouse.validator';

class WarehouseRoutes extends WarehouseController {
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
      systemMiddleware.validateRequestBody(warehouseValidator.create),
      this.create,
    );

    this.router.put(
      '/:warehouseId',
      authMiddleware.masterAuthorization,
      systemMiddleware.formatRequestParamsId('warehouseId'),
      systemMiddleware.validateRequestBody(warehouseValidator.update),
      systemMiddleware.rejectEmptyRequest,
      this.update,
    );

    this.router.delete(
      '/:warehouseId',
      authMiddleware.masterAuthorization,
      systemMiddleware.formatRequestParamsId('warehouseId'),
      this.delete,
    );

    this.router.get(
      '/:warehouseId',
      systemMiddleware.formatRequestParamsId('warehouseId'),
      this.get,
    );

    this.router.get('/', this.getAll);
  }
}

export default new WarehouseRoutes().router;
