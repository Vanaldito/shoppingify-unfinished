import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, ItemsListProvider } from "../../../../../src/components";
import { APIResponse } from "../../../../../src/models";
import { AddNewItem } from "../../../../../src/pages/ItemsPage/components";
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
                items: [{ name: "Name 1", note: "Note 1", image: "Image 1" }],
              },
            ],
          },
        })
      ),
      controller: new AbortController(),
    }),
    addItemToItemsList: () => ({
      call: new Promise(resolve => resolve({ status: 200 })),
      controller: new AbortController(),
    }),
  };
});

interface TestComponentProps {
  cancel: () => void;
}

function TestComponent({ cancel }: TestComponentProps) {
  return (
    <AuthProvider>
      <ItemsListProvider>
        <AddNewItem cancel={cancel} />
      </ItemsListProvider>
    </AuthProvider>
  );
}

describe("<AddNewItem />", () => {
  afterEach(cleanup);
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the AddNewItem component", () => {
    render(<TestComponent cancel={() => null} />);
  });

  it("Should render four inputs: Name, Note, Image and Category", () => {
    render(<TestComponent cancel={() => null} />);

    screen.getByLabelText("Name");
    screen.getByLabelText("Note (optional)");
    screen.getByLabelText("Image (optional)");
    screen.getByLabelText("Category");
  });

  it("Should render a button for cancel and a button for save", () => {
    render(<TestComponent cancel={() => null} />);

    expect(screen.getByText("Cancel").tagName).toBe("BUTTON");
    expect(screen.getByText("Save").tagName).toBe("BUTTON");
  });

  it("Should call the cancel function when the cancel button is clicked", async () => {
    const user = userEvent.setup();

    const cancel = vi.fn();
    render(<TestComponent cancel={cancel} />);

    const cancelButton = screen.getByText("Cancel");

    await user.click(cancelButton);

    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("Should not submit the form if the name or category fields do not have any content", async () => {
    const addItemToItemsList = vi
      .spyOn(services, "addItemToItemsList")
      .mockImplementation(() => ({
        call: new Promise<APIResponse<undefined>>(resolve =>
          resolve({ status: 200 })
        ),
        controller: new AbortController(),
      }));

    const user = userEvent.setup();
    render(<AddNewItem cancel={() => null} />);

    const saveButton = screen.getByText("Save") as HTMLButtonElement;

    await user.click(saveButton);

    expect(addItemToItemsList).toHaveBeenCalledTimes(0);
  });

  it("Should submit the form if the name or category fields do have content", async () => {
    const addItemToItemsList = vi
      .spyOn(services, "addItemToItemsList")
      .mockImplementation(() => ({
        call: new Promise<APIResponse<undefined>>(
          resolve => () => resolve({ status: 200 })
        ),
        controller: new AbortController(),
      }));

    const user = userEvent.setup();
    render(<TestComponent cancel={() => null} />);

    const nameField = screen.getByLabelText("Name") as HTMLInputElement;
    const categoryField = screen.getByLabelText("Category") as HTMLInputElement;

    const saveButton = screen.getByText("Save") as HTMLButtonElement;

    await user.type(nameField, "Some name");
    await user.type(categoryField, "Some category");

    await user.click(saveButton);

    expect(addItemToItemsList).toHaveBeenCalledTimes(1);
  });
});
