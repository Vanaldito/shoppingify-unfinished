import { createContext } from "react";

import { ItemsList } from "../models";

interface ItemsListContextValue {
  itemsList: null | ItemsList;
  changeItemsList: (newItemsList: ItemsList) => void;
  loading: boolean;
}

const ItemsListContext = createContext<ItemsListContextValue>({
  itemsList: null,
  changeItemsList: () => undefined,
  loading: false,
});

export default ItemsListContext;
