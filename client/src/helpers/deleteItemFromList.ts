import { ItemsList, ShoppingListList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
}

export default function deleteItemFromList(
  list: ShoppingListList | ItemsList,
  { category, name }: ItemInfo
) {
  const categoryIndex = list.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    return;
  }

  const itemIndex = list[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (itemIndex === -1) {
    return;
  }

  if (list[categoryIndex].items.length === 1) {
    list.splice(categoryIndex, 1);
    return;
  }

  list[categoryIndex].items.splice(itemIndex, 1);
  return;
}
