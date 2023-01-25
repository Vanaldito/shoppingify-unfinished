import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { FormField } from "../../../../src/components";

describe("<FormField />", () => {
  afterEach(cleanup);

  it("Should render the FormField component", () => {
    render(<FormField />);
  });

  it("Should render an input", () => {
    render(<FormField />);

    screen.getByRole("textbox");
  });
});
