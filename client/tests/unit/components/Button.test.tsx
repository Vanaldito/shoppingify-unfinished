import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { Button } from "../../../src/components";

describe("<Button />", () => {
  afterEach(cleanup);

  it("Should render the Button component", () => {
    render(<Button variant="primary" />);
  });

  it("Should render a button", () => {
    render(<Button variant="primary" />);

    screen.getByRole("button");
  });
});
