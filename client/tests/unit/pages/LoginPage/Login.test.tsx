import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Login } from "../../../../src/pages/LoginPage/components";

vi.mock("../../../../src/services", async () => {
  const actual = vi.importActual("../../../../src/services") as object;

  return {
    ...actual,
    login: () => ({
      call: new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              status: 401,
              error: "Email or password incorrect",
            }),
          200
        )
      ),
      controller: new AbortController(),
    }),
  };
});

describe("<Login />", () => {
  afterEach(cleanup);

  it("Should render the Login component", () => {
    render(
      <MemoryRouter>
        <Login setError={() => null} />
      </MemoryRouter>
    );
  });

  it("Should render two inputs for the password and the email", () => {
    render(
      <MemoryRouter>
        <Login setError={() => null} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(emailInput.getAttribute("type")).toBe("email");

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    expect(passwordInput.getAttribute("type")).toBe("password");
  });

  it("Should set an error message if the email input content is invalid", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login setError={() => null} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(emailInput.validationMessage).toBeTruthy();

    await user.type(emailInput, "test");
    expect(emailInput.validationMessage).toBeTruthy();

    await user.type(emailInput, "@test.com");
    expect(emailInput.validationMessage).toBeFalsy();
  });

  it("Should set an error message if the password input content is invalid", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login setError={() => null} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    expect(passwordInput.validationMessage).toBeTruthy();

    await user.type(passwordInput, "a");
    expect(passwordInput.validationMessage).toBeTruthy();

    await user.type(passwordInput, "A");
    expect(passwordInput.validationMessage).toBeTruthy();

    await user.type(passwordInput, "2");
    expect(passwordInput.validationMessage).toBeTruthy();

    await user.type(passwordInput, "at least 8 characters");
    expect(passwordInput.validationMessage).toBeFalsy();
  });

  it("Should display a loading message while submitting", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login setError={() => null} />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    await user.type(emailInput, "email@example.com");

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    await user.type(passwordInput, "1ValidPassword");

    const submitButton = screen.getByRole("button") as HTMLButtonElement;
    await user.click(submitButton);

    await screen.findByText("Loading...");
  });

  it("Should execute the setError function when an error is obtained", async () => {
    const user = userEvent.setup();

    const setError = vi.fn();

    render(
      <MemoryRouter>
        <Login setError={setError} />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    await user.type(emailInput, "email@example.com");

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    await user.type(passwordInput, "1ValidPassword");

    const submitButton = screen.getByRole("button") as HTMLButtonElement;
    await user.click(submitButton);

    await waitFor(() => {
      expect(setError).toBeCalledTimes(1);
    });
  });
});
