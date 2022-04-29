import { NextFunction } from "connect";
import { Request, Response } from "express";
import { HttpError } from "../errors/HttpError";

export const errorMiddleware = (err: Error | HttpError, _: Request, res: Response, __: NextFunction) => {
  const statusCode = err instanceof HttpError ? err.httpStatus : 400;
  return res.status(statusCode).json({
    error: err.message
  })
}
