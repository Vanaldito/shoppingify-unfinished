import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AuthProvider,
  ShoppingListProvider,
} from "../../../../../../src/components";
import { APIResponse } from "../../../../../../src/models";
import ShoppingListItem from "../../../../../../src/pages/ItemsPage/components/ShoppingList/ShoppingListItem";
import * as services from "../../../../../../src/services";

vi.mock(
  "../../../../../../src/services",
  async (): Promise<typeof services> => {
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
      // getItemsList: () => ({
      //   call: new Promise(resolve =>
      //     resolve({
      //       status: 200,
      //       data: {
      //         itemsList: [
      //           {
      //             category: "Category",
      //             items: [
      //               { name: "Item 1", note: "Note 1", image: "Image 1" },
      //               { name: "Item 2", note: "Note 2", image: "Image 2" },
      //             ],
      //           },
      //         ],
      //       },
      //     })
      //   ),
      //   controller: new AbortController(),
      // }),
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
                      { name: "Name", amount: 0, completed: true },
                      // { name: "Item 2", amount: 2, completed: false },
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
  }
);

interface TestComponentProps {
  name: string;
  category: string;
  amount: number;
  completed: boolean;
  mode: "complete" | "edit";
}

function TestComponent({
  name,
  category,
  amount,
  completed,
  mode,
}: TestComponentProps) {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <ShoppingListItem
          name={name}
          category={category}
          amount={amount}
          completed={completed}
          mode={mode}
        />
      </ShoppingListProvider>
    </AuthProvider>
  );
}

describe("<ShoppingListItem />", () => {
  afterEach(cleanup);

  it("Should render the ShoppingListItem component", () => {
    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="complete"
      />
    );
  });

  it("Should render the name and the amount of the item", () => {
    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="complete"
      />
    );

    screen.getByText("Name");
    screen.getByText("0 pcs");
  });

  it("Should render a button to mark the item as completed if the mode is complete", () => {
    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="edit"
      />
    );

    expect(() => screen.getByRole("button")).toThrow();

    cleanup();

    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="complete"
      />
    );

    screen.getByRole("button");
  });

  it("Should render three buttons to increase and decrease the item amount and delete the item if the mode is edit", () => {
    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="complete"
      />
    );

    expect(screen.getAllByRole("button").length).toBe(1);

    cleanup();

    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="edit"
      />
    );

    expect(screen.getAllByRole("button").length).toBe(3);
  });

  it("Should call the updateItemInShoppingList service when the checkButton is clicked", async () => {
    const user = userEvent.setup();

    let isCompleted = false;
    const updateItemInShoppingList = vi
      .spyOn(services, "updateItemInShoppingList")
      .mockImplementation(({ completed }) => {
        isCompleted = completed;

        return {
          call: new Promise(resolve => resolve({ status: 200 })),
          controller: new AbortController(),
        };
      });

    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="complete"
      />
    );

    const checkButton = screen.getByRole("button");

    await user.click(checkButton);

    expect(updateItemInShoppingList).toHaveBeenCalledTimes(1);
    expect(isCompleted).toBe(true);
  });

  it("Should call the updateItemInShoppingList service when the increase or decrease buttons are clicked", async () => {
    const user = userEvent.setup();

    let amountValue = 3;
    const updateItemInShoppingList = vi
      .spyOn(services, "updateItemInShoppingList")
      .mockImplementation(({ amount }) => {
        amountValue = amount;

        return {
          call: new Promise(resolve => resolve({ status: 200 })),
          controller: new AbortController(),
        };
      });

    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={amountValue}
        completed={false}
        mode="edit"
      />
    );

    const increaseButton = screen.getByText("+");

    await user.click(increaseButton);

    expect(updateItemInShoppingList).toHaveBeenCalledTimes(1);
    expect(amountValue).toBe(4);

    const decreaseButton = screen.getByText("\u2212"); // U+2212 = '−'

    await user.click(decreaseButton);

    expect(updateItemInShoppingList).toHaveBeenCalledTimes(2);
    expect(amountValue).toBe(2);
  });

  it("Should call the deleteItemFromShoppingList service when the delete button is clicked", async () => {
    const user = userEvent.setup();

    const deleteItemFromShoppingList = vi
      .spyOn(services, "deleteItemFromShoppingList")
      .mockImplementation(() => {
        return {
          call: new Promise<APIResponse<undefined>>(resolve =>
            resolve({ status: 200 })
          ),
          controller: new AbortController(),
        };
      });

    render(
      <TestComponent
        category="Category"
        name="Name"
        amount={0}
        completed={false}
        mode="edit"
      />
    );

    const deleteButton = screen.getAllByRole("button")[0];

    await user.click(deleteButton);

    expect(deleteItemFromShoppingList).toHaveBeenCalledTimes(1);
  });
});
