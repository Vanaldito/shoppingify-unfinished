import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FormError } from "../../../src/components";

describe("<FormError />", () => {
  afterEach(cleanup);

  it("Should render the FormError component", () => {
    render(<FormError error="Some error" clearError={() => null} />);
  });

  it("Should render the error message", () => {
    const error = "Any error";
    render(<FormError error={error} clearError={() => null} />);

    screen.getByText(error);
  });

  it("Should render a button to clear the error", () => {
    render(<FormError error="Some error" clearError={() => null} />);

    screen.getByRole("button");
  });

  it("Should call the clearError function when clicking the button", async () => {
    const user = userEvent.setup();

    const clearError = vi.fn();

    render(<FormError error="Some error" clearError={clearError} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(clearError).toBeCalledTimes(1);
  });
});
