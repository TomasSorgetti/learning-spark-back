import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-errors";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.errorStack && { details: err.errorStack }),
      statusCode: err.statusCode,
      errorName: err.name,
    });
  } else {
    console.error("Unhandled Error:", err);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
