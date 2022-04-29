export abstract class HttpError extends Error {
  public readonly httpStatus: number = 400;

  constructor(msg: string, statusCode: number) {
    super(msg);
    this.httpStatus = statusCode;
  }
}
