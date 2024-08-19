import Joi, { ValidationResult } from 'joi';
import BaseValidator from './base.validator';

import { Request } from 'express';

class ProductValidator extends BaseValidator {
  constructor() {
    super();
  }

  public create = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      name: Joi.string().required().min(4).label('Name'),
      price: Joi.number().label('Price').required(),
      description: Joi.string().label('Description').min(10),
    });

    return this.validate(schema, req);
  };

  public update = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      name: Joi.string().min(4).label('Name'),
      price: Joi.number().label('Price'),
      description: Joi.string().label('Description').min(10),
    });

    return this.validate(schema, req);
  };
}

export default new ProductValidator();
