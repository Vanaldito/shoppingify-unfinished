import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, it, vi } from "vitest";
import { AuthProvider, ProtectedRoute } from "../../../src/components";
import { APIResponse, FetchCall } from "../../../src/models";
import * as services from "../../../src/services";

interface TestComponentProps {
  children: React.ReactNode;
}

function TestComponent({ children }: TestComponentProps) {
  return (
    <MemoryRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute>{children}</ProtectedRoute>}
          />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

vi.mock("../../../src/services", async (): Promise<typeof services> => {
  const actual = await vi.importActual<typeof services>(
    "../../../src/services"
  );

  function getImplementation(auth: boolean) {
    return (): FetchCall<APIResponse<{ authenticated: boolean }>> => {
      return {
        call: new Promise(resolve => {
          resolve({ status: 200, data: { authenticated: auth } });
        }),
        controller: new AbortController(),
      };
    };
  }

  return {
    ...actual,
    getAuthStatus: vi
      .fn()
      .mockImplementationOnce(getImplementation(false))
      .mockImplementationOnce(getImplementation(false))
      .mockImplementationOnce(getImplementation(true)),
  };
});

describe("<ProtectedRoute />", () => {
  afterEach(cleanup);

  it("Should render the ProtectedRoute", () => {
    render(<TestComponent>Some text</TestComponent>);
  });

  it("Should redirect to /login if the user is not authenticated", async () => {
    render(<TestComponent>Some text</TestComponent>);

    await screen.findByText("Login");
  });

  it("Should render the children prop if the user is authenticated", async () => {
    render(<TestComponent>Some text</TestComponent>);

    await screen.findByText("Some text");
  });
});
