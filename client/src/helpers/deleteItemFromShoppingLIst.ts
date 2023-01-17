import { ShoppingList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
}

export default function deleteItemFromShoppingList(
  shoppingList: ShoppingList,
  { category, name }: ItemInfo
) {
  const categoryIndex = shoppingList.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  const itemIndex = shoppingList[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (shoppingList[categoryIndex].items.length === 1) {
    shoppingList.splice(categoryIndex, 1);
    return;
  }

  shoppingList[categoryIndex].items.splice(itemIndex, 1);
  return;
}
