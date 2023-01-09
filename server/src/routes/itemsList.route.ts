import { Router } from "express";
import { getUserIdFromCookie, insertItemInList } from "../helpers";
import { ItemsList, User, UserData } from "../models";

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

    const wasInserted = insertItemInList(
      itemsList,
      category,
      name,
      image,
      note
    );

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

export default itemsListRouter;
