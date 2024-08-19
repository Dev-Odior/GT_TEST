import serverConfig from '@src/config/server.config';
import { BadRequestError } from '@src/error';
import { RequestValidator } from '@src/interfaces/functions.interface';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

class SystemMiddleware {
  public errorHandler(): ErrorRequestHandler {
    return (error, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof Joi.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Validation Error',
          errors: error.details.map((error) => {
            return error.message;
          }),
        });
      }

      console.log(error);

      return res.send(`There was an error ${error}`);
    };
  }

  public validateRequestBody(validator: RequestValidator) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = validator(req);

      if (error) throw error;

      req.body = value;
      next();
    };
  }

  public formatQueryStrings(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        query: { limit, search, offset },
      } = req;

      req.queryOpts = {
        limit: limit ? Number(limit) : 10,
        offset: offset ? Number(limit) : 0,
        search: search ? (search as string) : '',
      };

      next();
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at System Middleware, Format Query Strings:${error}`,
      );
      next(error);
    }
  }

  public formatRequestParamsId(param: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { params, paramIds } = req;

        console.log(params);

        req.paramIds = { ...paramIds };
        req.paramIds[`${param}`] = Number(params[param]);

        return next();
      } catch (error) {
        serverConfig.DEBUG(
          `Error occurred at System Middleware, Format Request Params Id: ${error}`,
        );
        next(error);
      }
    };
  }

  public rejectEmptyRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const isEmpty = (obj: any): boolean => {
        return (
          obj !== null && obj !== undefined && Object.keys(obj).length === 0
        );
      };

      if (isEmpty(body)) {
        throw new BadRequestError('Empty Payload!');
      }

      next();
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at System Middleware, Reject Empty Body Method: ${error}`,
      );
      next(error);
    }
  }
}

export default new SystemMiddleware();
