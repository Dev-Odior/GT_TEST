import BaseValidator from './base.validator';
import Joi, { ValidationResult } from 'joi';

import { Request } from 'express';

class StockValidator extends BaseValidator {
  public create = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      productId: Joi.number().required().label('ProductId'),
      warehouseId: Joi.number().label('WarehouseId').required(),
      quantity: Joi.number().label('Quantity').required(),
    });

    return this.validate(schema, req);
  };

  public update = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      productId: Joi.number().label('ProductId'),
      warehouseId: Joi.number().label('WarehouseId'),
      quantity: Joi.number().label('Quantity'),
    });

    return this.validate(schema, req);
  };
}

export default new StockValidator();
