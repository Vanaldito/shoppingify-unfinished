import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AuthProvider,
  ItemsListProvider,
  ShoppingListProvider,
} from "../../../../src/components";
import { ItemsPage } from "../../../../src/pages";
import * as services from "../../../../src/services";

vi.mock("../../../../src/services", async (): Promise<typeof services> => {
  const actual = await vi.importActual<typeof services>(
    "../../../../src/services"
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
                  { name: "Name 1", note: "Note 1", image: "Image 1" },
                  { name: "Name 2", note: "Note 2", image: "Image 2" },
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
                  items: [{ name: "Item name", amount: 2, completed: true }],
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

function TestComponent() {
  return (
    <MemoryRouter>
      <AuthProvider>
        <ShoppingListProvider>
          <ItemsListProvider>
            <ItemsPage />
          </ItemsListProvider>
        </ShoppingListProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("<ItemsPage />", () => {
  afterEach(cleanup);

  it("Should render the ItemsPage component", () => {
    render(<TestComponent />);
  });

  it("Should render the items", async () => {
    render(<TestComponent />);

    await screen.findByText("Name 1");
    await screen.findByText("Name 2");
  });

  it("Should render the ShoppingList component", async () => {
    render(<TestComponent />);

    await screen.findByText("Shopping List");
  });

  it("Should render the AddNewItem component to click in the Add Item button", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const addItemButton = await screen.findByText("Add Item");

    await user.click(addItemButton);

    screen.getByText("Add a new item");
  });

  it("Should render the ItemInfo component by clicking the item", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const firstItem = await screen.findByText("Name 1");

    await user.click(firstItem);

    screen.getByText("Note 1");
    expect(
      screen.getAllByRole<HTMLImageElement>("img").some(el => {
        return el.getAttribute("src") === "Image 1";
      })
    ).toBe(true);
  });
});
