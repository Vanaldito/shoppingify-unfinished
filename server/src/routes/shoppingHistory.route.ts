import { Router } from "express";
import { getUserIdFromCookie } from "../helpers";
import { apiProtectedRoute } from "../middleware";
import { User, UserData } from "../models";

const shoppingHistoryRouter = Router();

shoppingHistoryRouter.get("/", apiProtectedRoute, (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];
  const userId = getUserIdFromCookie(authTokenCookie) as number;

  User.findById(userId, (err, result: UserData[]) => {
    if (err) {
      console.log(err);

      return res
        .status(500)
        .json({ status: 500, error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ status: 404, error: "User not found" });
    }

    const data = {
      shoppingHistory: JSON.parse(result[0].ShoppingHistory),
    };

    res.json({
      status: 200,
      data,
    });
  });
});

export default shoppingHistoryRouter;
