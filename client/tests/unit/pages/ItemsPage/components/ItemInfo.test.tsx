import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AuthProvider,
  ItemsListProvider,
  ShoppingListProvider,
} from "../../../../../src/components";
import { APIResponse } from "../../../../../src/models";
import { ItemInfo } from "../../../../../src/pages/ItemsPage/components";
import * as services from "../../../../../src/services";

vi.mock("../../../../../src/services", async (): Promise<typeof services> => {
  const actual = await vi.importActual<typeof services>(
    "../../../../../src/services"
  );

  return {
    ...actual,
    getAuthStatus: () => ({
      call: new Promise(resolve =>
        resolve({ status: 200, data: { authenticated: true } })
      ),
      controller: new AbortController(),
    }),
    getItemsList: () => ({
      call: new Promise(resolve =>
        resolve({
          status: 200,
          data: {
            itemsList: [
              {
                category: "Category",
                items: [
                  { name: "Item 1", note: "Note 1", image: "Image 1" },
                  { name: "Item 2", note: "Note 2", image: "Image 2" },
                ],
              },
            ],
          },
        })
      ),
      controller: new AbortController(),
    }),
    getShoppingList: () => ({
      call: new Promise(resolve =>
        resolve({
          status: 200,
          data: {
            shoppingList: {
              name: "List name",
              list: [
                {
                  category: "Category",
                  items: [
                    { name: "Item 1", amount: 10, completed: true },
                    { name: "Item 2", amount: 2, completed: false },
                  ],
                },
              ],
            },
          },
        })
      ),
      controller: new AbortController(),
    }),
  };
});

interface TestComponentProps {
  name: string;
  category: string;
  image?: string;
  note?: string;
  getBack: () => void;
}

function TestComponent({
  name,
  category,
  note,
  image,
  getBack,
}: TestComponentProps) {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <ItemsListProvider>
          <ItemInfo
            name={name}
            category={category}
            note={note}
            image={image}
            getBack={getBack}
          />
        </ItemsListProvider>
      </ShoppingListProvider>
    </AuthProvider>
  );
}

describe("<ItemInfo />", () => {
  afterEach(cleanup);

  it("Should render the ItemInfo component", () => {
    render(
      <TestComponent name="Name" category="Category" getBack={() => null} />
    );
  });

  it("Should render at least the name and the category of the item", () => {
    render(
      <TestComponent
        name="Item Name"
        category="Item Category"
        getBack={() => null}
      />
    );

    screen.getByText("Item Name");
    screen.getByText("Item Category");
  });

  it("Should render the note of the item if the item has one", () => {
    render(
      <TestComponent
        name="Item Name"
        category="Item Category"
        note="Item Note"
        getBack={() => null}
      />
    );

    screen.getByText("Item Note");
  });

  it("Should render the image of the item if the item has one", async () => {
    render(
      <TestComponent
        name="Item Name"
        category="Item Category"
        note="Item Note"
        image="http://example.com/image.png"
        getBack={() => null}
      />
    );

    expect(
      screen
        .getAllByRole<HTMLImageElement>("img")
        .some(img => img.src === "http://example.com/image.png")
    ).toBe(true);
  });

  it("Should call the getBack function when the return button is clicked", async () => {
    const user = userEvent.setup();

    const getBack = vi.fn();
    render(
      <TestComponent
        name="Item Name"
        category="Item Category"
        note="Item Note"
        image="http://example.com/image.png"
        getBack={getBack}
      />
    );

    const getBackButton = screen.getByText("back");

    await user.click(getBackButton);

    expect(getBack).toHaveBeenCalledTimes(1);
  });

  it("Should call the deleteItemFromItemsList service when the delete button is clicked", async () => {
    const deleteItemFromItemsList = vi
      .spyOn(services, "deleteItemFromItemsList")
      .mockImplementation(() => ({
        call: new Promise<APIResponse<undefined>>(resolve =>
          resolve({ status: 200 })
        ),
        controller: new AbortController(),
      }));

    const user = userEvent.setup();

    render(
      <TestComponent
        name="Item Name"
        category="Item Category"
        note="Item Note"
        image="http://example.com/image.png"
        getBack={() => null}
      />
    );

    const deleteButton = screen.getByText("Delete");

    await user.click(deleteButton);

    expect(deleteItemFromItemsList).toHaveBeenCalledTimes(1);
  });

  it("Should call the updateItemInShoppingList service when the add to list button is clicked", async () => {
    const updateItemInShoppingList = vi
      .spyOn(services, "updateItemInShoppingList")
      .mockImplementation(() => ({
        call: new Promise<APIResponse<undefined>>(resolve =>
          resolve({ status: 200 })
        ),
        controller: new AbortController(),
      }));

    const user = userEvent.setup();

    render(
      <TestComponent
        name="Item Name"
        category="Item Category"
        note="Item Note"
        image="http://example.com/image.png"
        getBack={() => null}
      />
    );

    const addToListButton = screen.getByText("Add to list");

    await user.click(addToListButton);

    expect(updateItemInShoppingList).toHaveBeenCalledTimes(1);
  });
});
