import { Router } from "express";
import { verifyAuthToken } from "../helpers";
import { User, UserData } from "../models";
import usersRouter from "./users.route";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);

apiRouter.get("/auth-status", (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];

  if (!authTokenCookie || typeof authTokenCookie !== "string") {
    return res.json({ status: 200, data: { authenticated: false } });
  }

  const authToken = authTokenCookie.split(" ")[1];

  if (!authToken) {
    return res.json({ status: 200, data: { authenticated: false } });
  }

  try {
    verifyAuthToken(authToken);

    res.json({ status: 200, data: { authenticated: true } });
  } catch {
    res.json({ status: 200, data: { authenticated: false } });
  }
});

apiRouter.get("/items-list", (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];

  if (!authTokenCookie || typeof authTokenCookie !== "string") {
    res.status(401).json({ status: 401, error: "User is not authenticated" });
  }

  const authToken = authTokenCookie.split(" ")[1];

  if (!authToken) {
    return res
      .status(401)
      .json({ status: 401, error: "User is not authenticated" });
  }

  let userId: number;
  try {
    userId = (verifyAuthToken(authToken) as { userId: number }).userId;
  } catch {
    return res
      .status(401)
      .json({ status: 401, error: "User is not authenticated" });
  }

  User.findById(userId, (err, result: UserData[]) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 500, error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ status: 404, error: "User not found" });
    }

    try {
      const data = { itemsList: JSON.parse(result[0].ItemsList) };

      res.json({
        status: 200,
        data,
      });
    } catch {
      res.status(500).json({ status: 500, error: "Internal server error" });
    }
  });
});

export default apiRouter;
