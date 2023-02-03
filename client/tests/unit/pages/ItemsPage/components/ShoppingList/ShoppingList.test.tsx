import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AuthProvider,
  ShoppingListProvider,
} from "../../../../../../src/components";
import { APIResponse } from "../../../../../../src/models";
import { ShoppingList } from "../../../../../../src/pages/ItemsPage/components";
import * as services from "../../../../../../src/services";

vi.mock("../../../../../../src/services", async () => {
  const actual = await vi.importActual<typeof services>(
    "../../../../../../src/services"
  );

  return {
    ...actual,
    getAuthStatus: () => ({
      call: new Promise(resolve =>
        resolve({ status: 200, data: { authenticated: true } })
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
                  items: [{ name: "Name", amount: 2, completed: true }],
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
  addItemHandler: () => void;
}

function TestComponent({ addItemHandler }: TestComponentProps) {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <ShoppingList addItemHandler={addItemHandler} />
      </ShoppingListProvider>
    </AuthProvider>
  );
}

describe("<ShoppingList />", () => {
  afterEach(cleanup);
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the ShoppingList component", () => {
    render(<TestComponent addItemHandler={() => null} />);
  });

  it("Should render a button to add a new item", () => {
    render(<TestComponent addItemHandler={() => null} />);

    const addNewItemButton = screen.getByText("Add Item") as HTMLButtonElement;
    expect(addNewItemButton.tagName).toBe("BUTTON");
  });

  it("Should call addItemHandler function when the add new item button is clicked", async () => {
    const user = userEvent.setup();

    const addNewItemHandler = vi.fn();
    render(<TestComponent addItemHandler={addNewItemHandler} />);

    const addNewItemButton = screen.getByText("Add Item") as HTMLButtonElement;

    await user.click(addNewItemButton);

    expect(addNewItemHandler).toHaveBeenCalledTimes(1);
  });

  it("Should start in complete mode and render a button to cancel and another one to complete the current list", () => {
    render(<TestComponent addItemHandler={() => null} />);

    screen.getByText("Complete") as HTMLButtonElement;
    screen.getByText("Cancel") as HTMLButtonElement;
  });

  it("Should render a button to toggle the mode and render an input to change the list name", async () => {
    const user = userEvent.setup();

    render(<TestComponent addItemHandler={() => null} />);

    const toggleButton = (await screen.findByTestId(
      "shopping-list__toggle-mode"
    )) as HTMLButtonElement;

    await user.click(toggleButton);

    const changeNameInput = screen.getByPlaceholderText(
      "Enter a name"
    ) as HTMLInputElement;
    expect(changeNameInput.value).toBe("List name");
    screen.getByText("Save");
  });

  it("Should render a message if there are no items in the shopping list", async () => {
    vi.spyOn(services, "getShoppingList").mockImplementationOnce(() => ({
      call: new Promise(resolve =>
        resolve({
          status: 200,
          data: {
            shoppingList: {
              name: "List name",
              list: [],
            },
          },
        })
      ),
      controller: new AbortController(),
    }));

    render(<TestComponent addItemHandler={() => null} />);

    await screen.findByText("No items");
  });

  it("Should call the cancelShoppingList service when the cancel or save button is clicked", async () => {
    const cancelShoppingList = vi
      .spyOn(services, "cancelShoppingList")
      .mockImplementation(() => ({
        call: new Promise<APIResponse<{ newListName: string }>>(resolve =>
          resolve({
            status: 200,
            data: { newListName: "New list name" },
          })
        ),
        controller: new AbortController(),
      }));

    const user = userEvent.setup();

    render(<TestComponent addItemHandler={() => null} />);

    const completeButton = screen.getByText("Complete") as HTMLButtonElement;

    await user.click(completeButton);
    expect(cancelShoppingList).toHaveBeenCalledTimes(1);

    const cancelButton = screen.getByText("Cancel") as HTMLButtonElement;

    await user.click(cancelButton);
    expect(cancelShoppingList).toHaveBeenCalledTimes(2);
  });

  it("Should call the changeShoppingListName when submit the change name form", async () => {
    const changeShoppingListName = vi
      .spyOn(services, "changeShoppingListName")
      .mockImplementation(() => ({
        call: new Promise<APIResponse<undefined>>(resolve =>
          resolve({
            status: 200,
          })
        ),
        controller: new AbortController(),
      }));

    const user = userEvent.setup();

    render(<TestComponent addItemHandler={() => null} />);

    const toggleButton = (await screen.findByTestId(
      "shopping-list__toggle-mode"
    )) as HTMLButtonElement;

    await user.click(toggleButton);

    const changeNameInput = screen.getByPlaceholderText(
      "Enter a name"
    ) as HTMLInputElement;
    expect(changeNameInput.value).toBe("List name");

    const saveButton = screen.getByText("Save") as HTMLButtonElement;
    await user.click(saveButton);

    expect(changeShoppingListName).toHaveBeenCalledTimes(1);
  });
});
