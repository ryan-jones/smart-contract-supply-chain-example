import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { roles } from "../roles";
import { unauthorized, forbidden } from "../utils/errors";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string = req.get("Authorization") || "";

    const token: string = authHeader.split(" ")[1];
    if (!token || token === "") {
      next(unauthorized("You're not signed in!"));
    }
    const decodedToken = await jwt.verify(token, "somesupersecretkey");
    if (!decodedToken) {
      next(unauthorized("You're not signed in!"));
    }
    if (decodedToken.exp < Date.now().valueOf() / 1000) {
      next(unauthorized("Token has expired"));
    }
  } catch (err) {
    next(unauthorized("You're not signed in!"));
  }
  next();
};

export const grantAccess = (action: string, resource: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permission = roles().can(req.body.role)[action](resource);
    if (!permission.granted) {
      next(forbidden("You don't the right permissions to perform this action"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
