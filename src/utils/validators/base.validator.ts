import Joi from 'joi';

import { Request } from 'express';

class BaseValidator {
  private options: Joi.ValidationOptions = {
    abortEarly: false,
    errors: {
      wrap: {
        label: '',
      },
    },
  };

  protected patterns = {
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
    phone: '',
  };

  public validate(schema: Joi.AnySchema, req: Request) {
    return schema.validate(req.body, this.options);
  }
}

export default BaseValidator;
