export type ItemsList = {
  category: string;
  items: Item[];
}[];

interface Item {
  name: string;
  image?: string;
  note?: string;
}
