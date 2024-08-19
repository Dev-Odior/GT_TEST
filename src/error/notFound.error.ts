import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message || 'Not Found Error', StatusCodes.NOT_FOUND);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default NotFoundError;
