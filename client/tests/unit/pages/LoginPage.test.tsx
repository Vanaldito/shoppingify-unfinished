import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, vi } from "vitest";
import { LoginPage } from "../../../src/pages";

vi.mock("../../../src/services", async () => {
  const actual = vi.importActual("../../../src/services") as object;

  return {
    ...actual,
    login: () => ({
      call: new Promise(resolve =>
        resolve({
          status: 401,
          error: "Email or password incorrect",
        })
      ),
      controller: new AbortController(),
    }),
  };
});

describe("<LoginPage />", () => {
  afterEach(cleanup);
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the LoginPage component", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  it("Should display an error message if the login fails", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "Test1234");

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    await screen.findByText("Email or password incorrect");
  });
});
