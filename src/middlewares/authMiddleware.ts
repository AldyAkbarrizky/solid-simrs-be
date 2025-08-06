import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../models";
import { errorResponse } from "../utils/apiResponse";
import Role from "../models/Role";

const { User } = db;

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password_hash"] },
        include: [{ model: Role, as: "role" }],
      });

      if (!req.user) {
        return errorResponse(
          res,
          "User belonging to this token does not exist",
          401
        );
      }

      next();
    } catch (error) {
      return errorResponse(res, "Not authorized, token failed", 401);
    }
  }

  if (!token) {
    return errorResponse(res, "Not authorized, no token", 401);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log(req.user?.role?.name);
    const userRole = req.user?.role?.name; // Assuming user.role.name exists
    if (!userRole || !roles.includes(userRole)) {
      return errorResponse(
        res,
        `User role '${userRole}' is not authorized to access this route`,
        403
      );
    }
    next();
  };
};
