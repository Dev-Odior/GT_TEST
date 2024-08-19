import Joi, { ValidationResult } from 'joi';
import BaseValidator from './base.validator';

import { Role } from '@src/interfaces/user.interface';

import { Request } from 'express';

const role = Object.values(Role);

class AuthValidator extends BaseValidator {
  constructor() {
    super();
  }

  public register = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      username: Joi.string().required().label('UserName'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string()
        .required()
        .regex(this.patterns.password)
        .min(8)
        .label('Password')
        .messages({
          'string.min': 'Password must be at least 8 characters long.',
          'string.pattern.base':
            'Password must contain alphanumeric characters and special characters',
        }),
      role: Joi.string()
        .label('Role')
        .valid(...role)
        .messages({
          'any.only': 'Role was invalid',
        }),
    });

    return this.validate(schema, req);
  };

  public login = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
    });

    return this.validate(schema, req);
  };
}

export default new AuthValidator();
