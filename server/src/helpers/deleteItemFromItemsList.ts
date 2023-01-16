import { ItemsList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
}

export default function deleteItemFromShoppingList(
  itemsList: ItemsList,
  { category, name }: ItemInfo
) {
  const categoryIndex = itemsList.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    return false;
  }

  const itemIndex = itemsList[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (itemIndex === -1) {
    return false;
  }

  if (itemsList[categoryIndex].items.length === 1) {
    itemsList.splice(categoryIndex, 1);

    return true;
  }

  itemsList[categoryIndex].items.splice(itemIndex, 1);
  return true;
}
