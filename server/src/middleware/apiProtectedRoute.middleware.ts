import { NextFunction, Request, Response } from "express";
import { getUserIdFromCookie } from "../helpers";

export default function apiProtectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authTokenCookie = req.cookies["auth-token"];

  if (!authTokenCookie || typeof authTokenCookie !== "string") {
    return res
      .status(401)
      .json({ status: 401, error: "User is not authenticated" });
  }

  const userId = getUserIdFromCookie(authTokenCookie);

  if (!userId) {
    return res
      .status(401)
      .json({ status: 401, error: "User is not authenticated" });
  }

  next();
}
