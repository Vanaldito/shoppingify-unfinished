import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ShoppingCart from "../../../../src/components/Navbar/ShoppingCart";

describe("<ShoppingCart />", () => {
  afterEach(cleanup);

  it("Should render the ShoppingCart component", () => {
    render(
      <MemoryRouter>
        <ShoppingCart toggleAsideBar={() => null} />
      </MemoryRouter>
    );
  });

  it("Should call the toggleAsideBar function on clicking it", async () => {
    const user = userEvent.setup();

    const toggleAsideBar = vi.fn();

    render(
      <MemoryRouter>
        <ShoppingCart toggleAsideBar={toggleAsideBar} />
      </MemoryRouter>
    );

    const shoppingCart = screen.getByRole("button") as HTMLButtonElement;

    await user.click(shoppingCart);

    expect(toggleAsideBar).toBeCalledTimes(1);
  });
});
