import { ItemsList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
  image?: string;
  note: string;
}

export default function insertItemInList(
  itemsList: ItemsList,
  { category, name, image, note }: ItemInfo
) {
  const categoryIndex = itemsList.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    itemsList.push({
      category: category.trim(),
      items: [
        {
          name: name.trim(),
          image: image?.trim(),
          note: note?.trim(),
        },
      ],
    });

    return true;
  }

  if (
    !itemsList[categoryIndex].items.some(
      element => element.name.toLowerCase() === name.toLowerCase().trim()
    )
  ) {
    itemsList[categoryIndex].items.push({
      name: name.trim(),
      image: image?.trim(),
      note: note?.trim(),
    });
    return true;
  }

  return false;
}
