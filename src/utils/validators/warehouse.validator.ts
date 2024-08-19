import { Request } from 'express';

import Joi, { ValidationResult } from 'joi';
import BaseValidator from './base.validator';

class WarehouseValidator extends BaseValidator {
  constructor() {
    super();
  }

  public create = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label('Name').min(4),
      capacity: Joi.string().required().label('Capacity'),
      location: Joi.string().required().label('Location'),
    });

    return this.validate(schema, req);
  };

  public update = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      name: Joi.string().label('Name').min(4),
      capacity: Joi.string().label('Capacity'),
      location: Joi.string().label('Location'),
    });

    return this.validate(schema, req);
  };
}

export default new WarehouseValidator();
