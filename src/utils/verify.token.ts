import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/users";

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization || "";

  if (authorization) {
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, "daisy2308");
    if (payload.type != undefined) {
      const user = await User.findByPk(payload.user_id);
      if (user) {
        req.body.user_id = user.user_id;
        return next();
      } else {
        res.status(401).json({ message: "You are not authenticated" });
      }
    }

    const user_id = payload.user_id;
    // const user = await UserModel.findById(payload.userId).exec();
    if (user_id) {
      req.body.user_id = user_id;
      return next();
    } else {
      res.status(401).json({ message: "You are not authenticated." });
    }
  } else {
    res.status(401).json({ message: "You are not authenticated." });
  }
  return { user: null };
};
