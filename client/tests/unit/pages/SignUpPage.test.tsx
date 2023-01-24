import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, vi } from "vitest";
import { SignUpPage } from "../../../src/pages";

vi.mock("../../../src/services", async () => {
  const actual = vi.importActual("../../../src/services") as object;

  return {
    ...actual,
    registerUser: () => ({
      call: new Promise(resolve =>
        resolve({
          status: 409,
          error: "Email is already used",
        })
      ),
      controller: new AbortController(),
    }),
  };
});

describe("<SignUpPage />", () => {
  afterEach(cleanup);
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the SignUpPage component", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
  });

  it("Should display an error message if the registration fails", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "Test1234");

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    await screen.findByText("Email is already used");
  });
});
