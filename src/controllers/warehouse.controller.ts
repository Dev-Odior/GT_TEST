import serverConfig from '@src/config/server.config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DuplicateError } from '@src/error';
import warehouseService from '@src/services/warehouse.service';

class WarehouseController {
  protected async get(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { warehouseId },
      } = req;

      const data = await warehouseService.get(warehouseId, true);

      res.status(StatusCodes.OK).json({
        message: 'Warehouse Successfully Retrieved!',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Warehouse Controller, Get Method: ${error}`,
      );

      next(error);
    }
  }

  protected async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const productsInfo = await warehouseService.getAll(req.queryOpts);

      res.status(StatusCodes.OK).json({
        message: 'Warehouses Successfully Retrieved!',
        data: productsInfo,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Warehouse Controller, Get All Method: ${error}`,
      );

      next(error);
    }
  }

  protected async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const warehouse = await warehouseService.findWarehouse(body);

      if (warehouse) {
        throw new DuplicateError('Warehouse already exists!');
      }

      const data = await warehouseService.create(body);

      res.status(StatusCodes.OK).json({
        message: 'Warehouse Created Successfully!',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Warehouse controller, Create Method: ${error}`,
      );
      next(error);
    }
  }

  protected async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { warehouseId },
        body,
      } = req;

      const data = await warehouseService.update({ id: warehouseId, ...body });

      res.status(StatusCodes.CREATED).json({
        message: 'Warehouse Updated Successfully!',
        data
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Warehouse controller, Update Method: ${error}`,
      );
      next(error);
    }
  }

  protected async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        paramIds: { warehouseId },
      } = req;

      await warehouseService.delete({ id: warehouseId });

      res.status(StatusCodes.CREATED).json({
        message: 'Warehouse Deleted Successfully!',
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Warehouse controller, delete Method: ${error}`,
      );
      next(error);
    }
  }
}

export default WarehouseController;
