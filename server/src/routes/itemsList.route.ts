import { Router } from "express";
import { getUserIdFromCookie } from "../helpers";
import { User, UserData } from "../models";

const itemsListRouter = Router();

itemsListRouter.get("/", (req, res) => {
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

itemsListRouter.post("/add", (req, res) => {
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

  const { item } = req.body;

  const isValidItem =
    Boolean(item) &&
    typeof item === "object" &&
    "category" in item &&
    "name" in item &&
    typeof item["name"] === "string" &&
    typeof item["category"] === "string";

  if (!isValidItem) {
    return res
      .status(400)
      .json({ status: 400, error: "Please enter a valid item" });
  }

  const { name, category } = item as { name: string; category: string };

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

    const itemsList: { category: string; items: string[] }[] = JSON.parse(
      result[0].ItemsList
    );

    const categoryIndex = itemsList.findIndex(
      element =>
        element.category.toLowerCase() === category.toLowerCase().trim()
    );

    if (categoryIndex === -1) {
      itemsList.push({
        category: category.trim(),
        items: [name.trim()],
      });
    } else if (
      !itemsList[categoryIndex].items.some(
        element => element.toLowerCase() === name.toLowerCase().trim()
      )
    ) {
      itemsList[categoryIndex].items.push(name.trim());
    } else {
      return res
        .status(409)
        .json({ status: 409, error: "Item is already in category" });
    }

    User.updateItemsList(userId, JSON.stringify(itemsList), err => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: 500, error: "Internal server error" });
      }

      res.json({ status: 200 });
    });
  });
});

export default itemsListRouter;
