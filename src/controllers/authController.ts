import { Request, Response, NextFunction } from "express";
import db from "../models";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/apiResponse";

const { User, Role } = db;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(res, "Username and password are required", 400);
    }

    const user = await User.findOne({
      where: { username },
      include: [{ model: Role, as: "role" }],
    });

    if (!user || !(await user.checkPassword(password))) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

    if (!jwtSecret || !jwtExpiresIn) {
      console.error("JWT Secret or Expiration not defined in .env file");
      return errorResponse(res, "Server configuration error", 500);
    }

    const token = jwt.sign(
      { id: user.id, role: (user as any).role.name },
      jwtSecret,
      { expiresIn: parseInt(jwtExpiresIn) }
    );

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: (user as any).role.name,
    };

    return successResponse(res, "Login successful", { token, user: userData });
  } catch (error) {
    next(error);
  }
};
