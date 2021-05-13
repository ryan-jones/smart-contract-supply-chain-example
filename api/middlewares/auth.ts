import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { roles } from "../roles";
import { unauthorized, forbidden, expired } from "../utils/errors";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string = req.get("Authorization") || "";

    const token: string = authHeader.split(" ")[1];
    if (!token || token === "") {
      next(unauthorized());
    }
    const decodedToken = await jwt.verify(token, "somesupersecretkey");
    if (!decodedToken) {
      next(unauthorized());
    }
    if (decodedToken.exp < Date.now().valueOf() / 1000) {
      next(expired());
    }
  } catch (err) {
    next(unauthorized());
  }
  next();
};

export const grantAccess =
  (action: string, resource: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permission = roles().can(req.body.role)[action](resource);
      if (!permission.granted) {
        next(forbidden());
      }
      next();
    } catch (error) {
      next(error);
    }
  };
