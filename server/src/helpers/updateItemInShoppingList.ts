import { ItemsList, ShoppingList } from "../models";

export default function updateItemInShoppingList(
  shoppingList: ShoppingList,
  itemsList: ItemsList,
  itemCategory: string,
  itemName: string,
  itemAmount: number
) {
  if (!itemIsInItemsList()) {
    return false;
  }

  const categoryIndex = shoppingList.findIndex(
    element =>
      element.category.toLowerCase() === itemCategory.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    shoppingList.push({
      category: itemCategory.trim(),
      items: [
        {
          name: itemName.trim(),
          amount: itemAmount,
        },
      ],
    });

    return true;
  }

  const itemIndex = shoppingList[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === itemName.toLowerCase().trim()
  );

  if (itemIndex === -1) {
    shoppingList[categoryIndex].items.push({
      name: itemName.trim(),
      amount: itemAmount,
    });

    return true;
  }

  shoppingList[categoryIndex].items[itemIndex].amount = itemAmount;

  return true;

  function itemIsInItemsList() {
    const categoryIndex = itemsList.findIndex(
      element =>
        element.category.toLowerCase() === itemCategory.toLowerCase().trim()
    );

    if (categoryIndex === -1) {
      return false;
    }

    return itemsList[categoryIndex].items.some(
      element =>
        element.name.toLocaleLowerCase() === itemName.toLocaleLowerCase().trim()
    );
  }
}
