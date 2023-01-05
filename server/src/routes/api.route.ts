import { Router } from "express";
import { verifyAuthToken } from "../helpers";
import itemsListRouter from "./itemsList.route";
import usersRouter from "./users.route";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);

// To get and modify a user items list
apiRouter.use("/items-list", itemsListRouter);

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
