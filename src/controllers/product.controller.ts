import serverConfig from '@src/config/server.config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import productService from '@src/services/product.service';
import { DuplicateError } from '@src/error';

class ProductController {
  protected async get(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { productId },
      } = req;

      const data = await productService.get(productId);

      res.status(StatusCodes.OK).json({
        message: 'Product Successfully Retrieved!',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Product Controller, Get Method: ${error}`,
      );

      next(error);
    }
  }

  protected async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const productsInfo = await productService.getAll(req.queryOpts);

      res.status(StatusCodes.OK).json({
        message: 'Products Successfully Retrieved!',
        data: productsInfo,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Product Controller, Get Method: ${error}`,
      );

      next(error);
    }
  }

  protected async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const product = await productService.findProduct(body);

      if (product) {
        throw new DuplicateError('Product already exists!');
      }

      const create = await productService.create(body);

      res.status(StatusCodes.OK).json({
        message: 'Product Created Successfully!',
        data: create,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Product controller, Create Method: ${error}`,
      );
      next(error);
    }
  }

  protected async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { productId },
        body,
      } = req;

      const product = await productService.update({ id: productId, ...body });

      res.status(StatusCodes.CREATED).json({
        message: 'Product Updated Successfully!',
        data: product,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Product controller, Update Method: ${error}`,
      );
      next(error);
    }
  }

  protected async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { productId },
      } = req;

      await productService.delete({ id: productId });

      res.status(StatusCodes.CREATED).json({
        message: 'Product Deleted Successfully!',
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Product controller, delete Method: ${error}`,
      );
      next(error);
    }
  }
}

export default ProductController;
