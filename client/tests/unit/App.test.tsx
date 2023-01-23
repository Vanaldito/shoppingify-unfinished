import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, vi } from "vitest";
import App from "../../src/App";

vi.mock("../../src/services", async () => {
  const current = (await vi.importActual("../../src/services")) as object;

  return {
    ...current,
    getAuthStatus: () => ({
      call: new Promise(resolve =>
        resolve({ status: 200, data: { authenticated: false } })
      ),
      controller: new AbortController(),
    }),
  };
});

describe("<App />", () => {
  afterEach(cleanup);
  afterEach(() => {
    vi.clearAllMocks;
  });

  it("Should render the App component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
