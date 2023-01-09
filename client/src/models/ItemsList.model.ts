export type ItemsList = {
  category: string;
  items: {
    name: string;
    image?: string;
    note?: string;
  }[];
}[];
