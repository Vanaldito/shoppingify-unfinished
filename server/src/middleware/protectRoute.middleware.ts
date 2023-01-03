import { NextFunction, Request, Response } from "express";
import { verifyAuthToken } from "../helpers";

export default function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authTokenCookie = req.cookies["auth-token"];

  if (!authTokenCookie || typeof authTokenCookie !== "string") {
    return res.redirect("/login");
  }

  const authToken = authTokenCookie.split(" ")[1];

  if (!authToken) {
    return res.redirect("/login");
  }

  try {
    verifyAuthToken(authToken);

    next();
  } catch {
    return res.redirect("/login");
  }
}
