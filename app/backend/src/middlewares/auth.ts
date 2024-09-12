import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import HttpError from "../models/http-error.model";
import { AuthRequest } from "interfaces/authentication-req.interface";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new HttpError(`No token provided`, 401);
  }

  try {
    const decoded: any = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new HttpError(`Invalid token`, 401);
  }
};
