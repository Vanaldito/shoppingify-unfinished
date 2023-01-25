import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it } from "vitest";
import { Logo } from "../../../src/components";

describe("<Logo />", () => {
  afterEach(cleanup);

  it("Should render the Logo component", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
  });

  it("Should render a link", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    screen.getByRole("link");
  });

  it("Should render an image", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    screen.getByRole("img");
  });
});
