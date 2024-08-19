import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authMiddleware from '@src/middleware/auth.middleware';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import systemMiddleware from '@src/middleware/system.middleware';
import warehouseRoutes from './warehouse.routes';
import stockRoutes from './stock.routes';

class Routers {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get(
      '/',
      authMiddleware.checkAccessToken,
      (req: Request, res: Response) => {
        console.log('the home route');
        return res.status(StatusCodes.OK).json({
          message: 'Welcome to GT Test Project',
          version: '1.0.0',
        });
      },
    );

    this.router.use('/auth', authRoutes);

    this.router.use(
      '/product',
      authMiddleware.checkAccessToken,
      systemMiddleware.formatQueryStrings,
      productRoutes,
    );

    this.router.use(
      '/warehouse',
      authMiddleware.checkAccessToken,
      systemMiddleware.formatQueryStrings,
      warehouseRoutes,
    );

    this.router.use(
      '/stock',
      authMiddleware.checkAccessToken,
      systemMiddleware.formatQueryStrings,
      stockRoutes,
    );

    this.router.all('*', (req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'Resource not found',
      });
    });
  }
}

export default new Routers().router;
