import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PasswordField } from "../../../../src/components";

describe("<PasswordField />", () => {
  afterEach(cleanup);

  it("Should render the PasswordField component", () => {
    render(
      <PasswordField password="some password" changePassword={() => null} />
    );
  });

  it("Should render an input with type password", () => {
    render(
      <PasswordField password="some password" changePassword={() => null} />
    );

    const emailInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    expect(emailInput.getAttribute("type")).toBe("password");
  });

  it("Should have as value the password prop", () => {
    render(
      <PasswordField password="some password" changePassword={() => null} />
    );

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    expect(passwordInput.value).toBe("some password");
  });

  it("Should call the changeEmail function on change event", async () => {
    const user = userEvent.setup();

    const changePassword = vi.fn();
    render(
      <PasswordField password="some password" changePassword={changePassword} />
    );

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    await user.type(passwordInput, "some value");

    expect(changePassword).toBeCalledTimes(10);
  });
});
