import StatusCodes from '../enums/statusCodes';

export default class AppError extends Error {
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
