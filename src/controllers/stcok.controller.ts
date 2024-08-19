import serverConfig from '@src/config/server.config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DuplicateError } from '@src/error';

import stockService from '@src/services/stock.service';
import productService from '@src/services/product.service';
import warehouseService from '@src/services/warehouse.service';

class StockController {
  protected async get(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { stockId },
      } = req;

      const data = await stockService.get(stockId);

      res.status(StatusCodes.OK).json({
        message: 'Stock Successfully Retrieved!',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Stock Controller, Get Method: ${error}`,
      );

      next(error);
    }
  }

  protected async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const stocksInfo = await stockService.getAll(req.queryOpts);

      res.status(StatusCodes.OK).json({
        message: 'Stocks Successfully Retrieved!',
        data: stocksInfo,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Stock Controller, Get Method: ${error}`,
      );

      next(error);
    }
  }

  protected async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const { productId, warehouseId } = body;

      const stock = await stockService.findStock(body);

      await productService.get(productId, true);
      await warehouseService.get(warehouseId, true);

      if (stock) {
        throw new DuplicateError('Stock already exists!');
      }

      const create = await stockService.create(body);

      res.status(StatusCodes.OK).json({
        message: 'Stock Created Successfully!',
        data: create,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Stock controller, Create Method: ${error}`,
      );
      next(error);
    }
  }

  protected async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { stockId },
        body,
      } = req;

      const stock = await stockService.update({ id: stockId, ...body });

      res.status(StatusCodes.CREATED).json({
        message: 'Stock Updated Successfully!',
        data: stock,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Stock controller, Update Method: ${error}`,
      );
      next(error);
    }
  }

  protected async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { stockId },
      } = req;

      await stockService.delete({ id: stockId });

      res.status(StatusCodes.CREATED).json({
        message: 'Stock Deleted Successfully!',
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Stock controller, delete Method: ${error}`,
      );
      next(error);
    }
  }
}

export default StockController;
