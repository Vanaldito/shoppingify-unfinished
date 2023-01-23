import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterAll, describe, it, vi } from "vitest";
import App from "../../src/App";

vi.mock("../../src/services", () => ({
  getAuthStatus: () => ({
    call: new Promise(resolve =>
      resolve({ status: 200, data: { authenticated: false } })
    ),
    controller: new AbortController(),
  }),
}));

describe("<App />", () => {
  afterAll(cleanup);

  it("Should render the App component", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
