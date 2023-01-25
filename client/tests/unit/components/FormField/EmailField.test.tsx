import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmailField } from "../../../../src/components";

describe("<EmailField />", () => {
  afterEach(cleanup);

  it("Should render the EmailField component", () => {
    render(<EmailField email="some email" changeEmail={() => null} />);
  });

  it("Should render an input with type email", () => {
    render(<EmailField email="some email" changeEmail={() => null} />);

    const emailInput = screen.getByRole("textbox") as HTMLInputElement;

    expect(emailInput.getAttribute("type")).toBe("email");
  });

  it("Should have as value the email prop", () => {
    render(<EmailField email="some email" changeEmail={() => null} />);

    const emailInput = screen.getByRole("textbox") as HTMLInputElement;

    expect(emailInput.value).toBe("some email");
  });

  it("Should call the changeEmail function on change event", async () => {
    const user = userEvent.setup();

    const changeEmail = vi.fn();
    render(<EmailField email="some email" changeEmail={changeEmail} />);

    const emailInput = screen.getByRole("textbox") as HTMLInputElement;

    await user.type(emailInput, "some value");

    expect(changeEmail).toBeCalledTimes(9);
  });
});
