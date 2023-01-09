import { ItemsList } from "../models";

export default function insertItemInList(
  itemsList: ItemsList,
  itemCategory: string,
  itemName: string,
  itemImage?: string,
  itemNote?: string
) {
  const categoryIndex = itemsList.findIndex(
    element =>
      element.category.toLowerCase() === itemCategory.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    itemsList.push({
      category: itemCategory.trim(),
      items: [
        {
          name: itemName.trim(),
          image: itemImage?.trim(),
          note: itemNote?.trim(),
        },
      ],
    });

    return true;
  }

  if (
    !itemsList[categoryIndex].items.some(
      element => element.name.toLowerCase() === itemName.toLowerCase().trim()
    )
  ) {
    itemsList[categoryIndex].items.push({
      name: itemName.trim(),
      image: itemImage?.trim(),
      note: itemNote?.trim(),
    });
    return true;
  }

  return false;
}
