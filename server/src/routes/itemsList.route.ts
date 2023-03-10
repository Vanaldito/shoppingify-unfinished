import { Router } from "express";
import {
  deleteItemFromItemsList,
  deleteItemFromShoppingList,
  getUserIdFromCookie,
  insertItemInList,
} from "../helpers";
import { apiProtectedRoute } from "../middleware";
import { ItemsList, User, UserData } from "../models";

const itemsListRouter = Router();

itemsListRouter.get("/", apiProtectedRoute, (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];
  const userId = getUserIdFromCookie(authTokenCookie) as number;

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

itemsListRouter.post("/add", apiProtectedRoute, (req, res) => {
  const authTokenCookie = req.cookies["auth-token"];
  const userId = getUserIdFromCookie(authTokenCookie) as number;

  const { category, name, image, note } = req.body;

  const isValidItem =
    typeof category === "string" &&
    Boolean(category.trim()) &&
    typeof name === "string" &&
    Boolean(name.trim());

  if (!isValidItem) {
    return res.status(400).json({
      status: 400,
      error: "Please enter a valid category and name",
    });
  }

  if (image !== undefined && (typeof image !== "string" || !image.trim())) {
    return res.status(400).json({
      status: 400,
      error: "Please enter a valid image url",
    });
  }

  if (note !== undefined && (typeof note !== "string" || !note.trim())) {
    return res.status(400).json({
      status: 400,
      error: "Please enter a valid note",
    });
  }

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

    const itemsList: ItemsList = JSON.parse(result[0].ItemsList);

    const wasInserted = insertItemInList(itemsList, {
      category,
      name,
      image,
      note,
    });

    if (!wasInserted) {
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

itemsListRouter.post("/delete", (req, res) => {
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

    const itemsList = JSON.parse(result[0].ItemsList);
    const shoppingList = JSON.parse(result[0].ShoppingList);

    deleteItemFromShoppingList(shoppingList, { category, name });
    const wasDeleted = deleteItemFromItemsList(itemsList, {
      category,
      name,
    });

    if (!wasDeleted) {
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
});

export default itemsListRouter;
