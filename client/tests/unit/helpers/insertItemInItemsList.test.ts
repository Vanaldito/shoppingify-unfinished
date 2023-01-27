import { describe, expect, it } from "vitest";
import { insertItemInItemsList } from "../../../src/helpers";
import { ItemsList } from "../../../src/models";

describe("insertItemInItemsList", () => {
  it("Should create a new category if the category does not exists", () => {
    const itemsList: ItemsList = [];

    insertItemInItemsList(itemsList, {
      category: "Category",
      name: "Name",
      image: "https://example.com/image",
      note: "A note",
    });

    const expectedList: ItemsList = [
      {
        category: "Category",
        items: [
          { name: "Name", note: "A note", image: "https://example.com/image" },
        ],
      },
    ];

    expect(itemsList).toEqual(expectedList);
  });

  it("Should push the item if the category exists", () => {
    const itemsList: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Name",
            image: "https://example.com/image",
            note: "A note",
          },
        ],
      },
    ];

    insertItemInItemsList(itemsList, {
      category: "Category",
      name: "Name2",
      image: "https://example2.com/image",
      note: "A 2nd note",
    });

    const expectedList: ItemsList = [
      {
        category: "Category",
        items: [
          { name: "Name", note: "A note", image: "https://example.com/image" },
          {
            name: "Name2",
            note: "A 2nd note",
            image: "https://example2.com/image",
          },
        ],
      },
    ];

    expect(itemsList).toEqual(expectedList);
  });

  it("Should be case insensitive and ignore the spaces from the end and the start", () => {
    const itemsList: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Name",
            image: "https://example.com/image",
            note: "A note",
          },
        ],
      },
    ];

    insertItemInItemsList(itemsList, {
      category: " category ",
      name: "Name2  ",
      image: "  https://example2.com/image",
      note: "\nA 2nd note",
    });

    const expectedList: ItemsList = [
      {
        category: "Category",
        items: [
          { name: "Name", note: "A note", image: "https://example.com/image" },
          {
            name: "Name2",
            note: "A 2nd note",
            image: "https://example2.com/image",
          },
        ],
      },
    ];

    expect(itemsList).toEqual(expectedList);
  });

  it("Should not insert the item if already exists", () => {
    const itemsList: ItemsList = [
      {
        category: "Category",
        items: [
          {
            name: "Name",
            image: "https://example.com/image",
            note: "A note",
          },
        ],
      },
    ];

    insertItemInItemsList(itemsList, {
      category: " category ",
      name: "Name",
      image: "https://example2.com/image",
      note: "A 2nd note",
    });

    const expectedList: ItemsList = [
      {
        category: "Category",
        items: [
          { name: "Name", note: "A note", image: "https://example.com/image" },
        ],
      },
    ];

    expect(itemsList).toEqual(expectedList);
  });
});
