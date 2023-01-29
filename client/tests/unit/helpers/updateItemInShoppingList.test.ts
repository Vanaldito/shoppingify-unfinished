import { describe, expect, it } from "vitest";
import { updateItemInShoppingList } from "../../../src/helpers";
import { ShoppingListList } from "../../../src/models";

describe("updateItemInShoppingList", () => {
  it("Should create a new category if the category does not exists", () => {
    const list: ShoppingListList = [];

    updateItemInShoppingList(list, {
      category: "Category",
      name: "Name",
      amount: 10,
      completed: false,
    });

    const expectedList: ShoppingListList = [
      {
        category: "Category",
        items: [{ name: "Name", amount: 10, completed: false }],
      },
    ];

    expect(list).toEqual(expectedList);
  });

  it("Should push the item if the category exists", () => {
    const list: ShoppingListList = [
      {
        category: "Category",
        items: [
          {
            name: "Name",
            amount: 10,
            completed: false,
          },
        ],
      },
    ];

    updateItemInShoppingList(list, {
      category: "Category",
      name: "Name2",
      amount: 2,
      completed: true,
    });

    const expectedList: ShoppingListList = [
      {
        category: "Category",
        items: [
          { name: "Name", amount: 10, completed: false },
          {
            name: "Name2",
            amount: 2,
            completed: true,
          },
        ],
      },
    ];

    expect(list).toEqual(expectedList);
  });

  it("Should be case insensitive and ignore the spaces from the end and the start", () => {
    const list: ShoppingListList = [
      {
        category: "Category",
        items: [
          {
            name: "Name",
            amount: 10,
            completed: false,
          },
        ],
      },
    ];

    updateItemInShoppingList(list, {
      category: " category ",
      name: "Name2  ",
      amount: 10,
      completed: false,
    });

    const expectedList: ShoppingListList = [
      {
        category: "Category",
        items: [
          { name: "Name", completed: false, amount: 10 },
          {
            name: "Name2",
            amount: 10,
            completed: false,
          },
        ],
      },
    ];

    expect(list).toEqual(expectedList);
  });

  it("Should update the item info if already exists", () => {
    const itemsList: ShoppingListList = [
      {
        category: "Category",
        items: [
          {
            name: "Name",
            amount: 10,
            completed: false,
          },
        ],
      },
    ];

    updateItemInShoppingList(itemsList, {
      category: " category ",
      name: "Name",
      amount: 2,
      completed: true,
    });

    const expectedList: ShoppingListList = [
      {
        category: "Category",
        items: [{ name: "Name", amount: 2, completed: true }],
      },
    ];

    expect(itemsList).toEqual(expectedList);
  });
});
