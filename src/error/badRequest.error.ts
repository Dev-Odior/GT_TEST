import CustomError from './custom.error';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message || 'Bad Request Error', StatusCodes.BAD_REQUEST);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BadRequestError;
