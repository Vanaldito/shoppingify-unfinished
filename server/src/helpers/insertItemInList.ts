export default function insertItemInList(
  itemsList: { category: string; items: string[] }[],
  itemCategory: string,
  itemName: string
) {
  const categoryIndex = itemsList.findIndex(
    element =>
      element.category.toLowerCase() === itemCategory.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    itemsList.push({
      category: itemCategory.trim(),
      items: [itemName.trim()],
    });

    return true;
  }

  if (
    !itemsList[categoryIndex].items.some(
      element => element.toLowerCase() === itemName.toLowerCase().trim()
    )
  ) {
    itemsList[categoryIndex].items.push(itemName.trim());
    return true;
  }

  return false;
}
