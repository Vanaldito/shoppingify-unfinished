import { createContext } from "react";
import { ShoppingList } from "../models";

interface ShoppingListContextValue {
  shoppingList: null | ShoppingList;
  changeShoppingList: (newShoppingList: ShoppingList) => void;
  loading: boolean;
  requestShoppingList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextValue>({
  shoppingList: [],
  changeShoppingList: () => undefined,
  loading: false,
  requestShoppingList: () => undefined,
});

export default ShoppingListContext;
