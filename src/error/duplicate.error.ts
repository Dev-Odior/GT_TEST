import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class DuplicateError extends CustomError {
  constructor(message: string) {
    super(message || 'Duplicate error!', StatusCodes.BAD_REQUEST);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default DuplicateError;
