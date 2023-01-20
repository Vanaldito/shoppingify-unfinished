import { Router } from "express";
import {
  deleteItemFromShoppingList,
  getUserIdFromCookie,
  updateItemInShoppingList,
} from "../helpers";
import { apiProtectedRoute } from "../middleware";
import { User, UserData } from "../models";

const shoppingListRouter = Router();

shoppingListRouter.get("/", apiProtectedRoute, (req, res) => {
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
      shoppingList: JSON.parse(result[0].ShoppingList),
    };

    res.json({
      status: 200,
      data,
    });
  });
});

shoppingListRouter.post("/name", apiProtectedRoute, (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];
  const userId = getUserIdFromCookie(authTokenCookie) as number;

  const { name } = req.body;

  const isValidName = typeof name === "string" && Boolean(name.trim());

  if (!isValidName) {
    return res
      .status(400)
      .json({ status: 400, error: "Please enter a valid name" });
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

    const shoppingList = JSON.parse(result[0].ShoppingList);

    shoppingList.name = name.trim();

    User.updateShoppingList(userId, JSON.stringify(shoppingList), err => {
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

shoppingListRouter.post("/delete", apiProtectedRoute, (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];
  const userId = getUserIdFromCookie(authTokenCookie) as number;

  const { category, name } = req.body;

  const isValidCategory =
    typeof category === "string" && Boolean(category.trim());
  const isValidName = typeof name === "string" && Boolean(name.trim());

  if (!isValidCategory || !isValidName) {
    return res.status(400).json({
      status: 400,
      error: "Please enter a valid item info",
    });
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

    const shoppingList = JSON.parse(result[0].ShoppingList);

    const wasDeleted = deleteItemFromShoppingList(shoppingList, {
      category,
      name,
    });

    if (!wasDeleted) {
      return res
        .status(400)
        .json({ status: 400, error: "Item is not in the shopping list" });
    }

    User.updateShoppingList(userId, JSON.stringify(shoppingList), err => {
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

shoppingListRouter.post("/update", apiProtectedRoute, (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];
  const userId = getUserIdFromCookie(authTokenCookie) as number;

  const { category, name, amount, completed } = req.body;

  const isValidCategory =
    typeof category === "string" && Boolean(category.trim());
  const isValidName = typeof name === "string" && Boolean(name.trim());
  const isValidAmount =
    typeof amount === "number" && !isNaN(amount) && amount >= 0;

  if (
    !isValidCategory ||
    !isValidName ||
    !isValidAmount ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      status: 400,
      error: "Please enter a valid item info",
    });
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

    const itemsList = JSON.parse(result[0].ItemsList);
    const shoppingList = JSON.parse(result[0].ShoppingList);

    const updated = updateItemInShoppingList(shoppingList, itemsList, {
      category,
      name,
      amount: Math.round(amount),
      completed,
    });

    if (!updated) {
      return res
        .status(400)
        .json({ status: 400, error: "Item is not in the items list" });
    }

    User.updateShoppingList(userId, JSON.stringify(shoppingList), err => {
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

export default shoppingListRouter;
