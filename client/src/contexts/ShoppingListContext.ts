import { createContext } from "react";
import { ShoppingList } from "../models";

interface ShoppingListContextValue {
  shoppingList: null | ShoppingList;
  changeShoppingList: (newShoppingList: ShoppingList) => void;
  loading: boolean;
}

const ShoppingListContext = createContext<ShoppingListContextValue>({
  shoppingList: [],
  changeShoppingList: () => undefined,
  loading: false,
});

export default ShoppingListContext;
