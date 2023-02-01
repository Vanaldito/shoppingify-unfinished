import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Item } from "../../../../../src/pages/ItemsPage/components";

describe("<Item />", () => {
  afterEach(cleanup);

  it("Should render the Item component", () => {
    render(<Item itemName="Name" selectItem={() => null} />);
  });

  it("Should call the selectItem function when the item is clicked", async () => {
    const user = userEvent.setup();

    const selectItem = vi.fn();
    render(<Item itemName="Name" selectItem={selectItem} />);

    const item = screen.getByText("Name");

    await user.click(item);

    expect(selectItem).toHaveBeenCalledTimes(1);
  });
});
