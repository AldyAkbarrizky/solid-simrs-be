import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { errorResponse } from "../utils/apiResponse";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    const messages = err.errors.map((e) => e.message).join(", ");
    return errorResponse(res, `Validation Error: ${messages}`, 400);
  }

  return errorResponse(res, err.message || "An unexpected error occurred", 500);
};
