import { Router } from "express";
import { verifyAuthToken } from "../helpers";
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

export default apiRouter;
