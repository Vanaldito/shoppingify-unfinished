import { describe, expect, it } from "vitest";
import { deleteItemFromList } from "../../../src/helpers";
import { ItemsList } from "../../../src/models";

describe("deleteItemFromList", () => {
  it("Should delete an item and leave the category if there are still items left", () => {
    const list: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Item 1",
            note: "Note 1",
            image: "https://example.com/image1.jpg",
          },
          {
            name: "Item 2",
            note: "Note 2",
            image: "https://example.com/image2.jpg",
          },
        ],
      },
    ];

    deleteItemFromList(list, { category: "Category", name: "Item 2" });

    const expectedList: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Item 1",
            note: "Note 1",
            image: "https://example.com/image1.jpg",
          },
        ],
      },
    ];

    expect(list).toEqual(expectedList);
  });

  it("Should delete an item and remove the category if there are not items left", () => {
    const list: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Item 1",
            note: "Note 1",
            image: "https://example.com/image1.jpg",
          },
        ],
      },
    ];

    deleteItemFromList(list, { category: "Category", name: "Item 1" });

    const expectedList: ItemsList = [];

    expect(list).toEqual(expectedList);
  });

  it("Should not delete and item if does not exist", () => {
    const list: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Item 1",
            note: "Note 1",
            image: "https://example.com/image1.jpg",
          },
        ],
      },
    ];

    deleteItemFromList(list, { category: "Category", name: "Item 2" });

    const expectedList: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Item 1",
            note: "Note 1",
            image: "https://example.com/image1.jpg",
          },
        ],
      },
    ];

    expect(list).toEqual(expectedList);
  });

  it("Should be case insensitive and ignore the spaces from the end and the start", () => {
    const list: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Item 1",
            image: "https://example.com/image",
            note: "Note 1",
          },
        ],
      },
    ];

    deleteItemFromList(list, {
      category: "caTegory",
      name: "  iTem 1   ",
    });

    const expectedList: ItemsList = [];

    expect(list).toEqual(expectedList);
  });
});
