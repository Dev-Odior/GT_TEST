import { Router } from 'express';

import ProductController from '@src/controllers/product.controller';

import authMiddleware from '@src/middleware/auth.middleware';
import systemMiddleware from '@src/middleware/system.middleware';

import productValidator from '@src/utils/validators/product.validator';

class ProductRoutes extends ProductController {
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
      systemMiddleware.validateRequestBody(productValidator.create),
      this.create,
    );

    this.router.put(
      '/:productId',
      authMiddleware.checkAuthorization,
      systemMiddleware.formatRequestParamsId('productId'),
      systemMiddleware.validateRequestBody(productValidator.update),
      systemMiddleware.rejectEmptyRequest,
      this.update,
    );

    this.router.delete(
      '/:productId',
      authMiddleware.checkAuthorization,
      systemMiddleware.formatRequestParamsId('productId'),
      this.delete,
    );

    this.router.get(
      '/:productId',
      systemMiddleware.formatRequestParamsId('productId'),
      this.get,
    );

    this.router.get('/', this.getAll);
  }
}

export default new ProductRoutes().router;
