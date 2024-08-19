import { StatusCodes } from 'http-status-codes';

import CustomError from './custom.error';

class Unauthorized extends CustomError {
  constructor(message: string) {
    super(message || 'You are Unauthorized', StatusCodes.UNAUTHORIZED);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default Unauthorized;
