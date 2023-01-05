import { NextFunction, Request, Response } from "express";
import { getUserIdFromCookie } from "../helpers";

export default function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authTokenCookie = req.cookies["auth-token"];

  if (!authTokenCookie || typeof authTokenCookie !== "string") {
    return res.redirect("/login");
  }

  const userId = getUserIdFromCookie(authTokenCookie);

  if (!userId) {
    return res.redirect("/login");
  }

  next();
}
