import { ShoppingList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
}

export default function deleteItemFromShoppingList(
  shoppingList: ShoppingList,
  { category, name }: ItemInfo
) {
  const list = shoppingList.list;

  const categoryIndex = list.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    return false;
  }

  const itemIndex = list[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (itemIndex === -1) {
    return false;
  }

  if (list[categoryIndex].items.length === 1) {
    list.splice(categoryIndex, 1);

    return true;
  }

  list[categoryIndex].items.splice(itemIndex, 1);
  return true;
}
