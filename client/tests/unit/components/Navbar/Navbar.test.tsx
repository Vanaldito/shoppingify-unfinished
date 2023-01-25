import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it } from "vitest";
import { Navbar } from "../../../../src/components";

describe("<Navbar />", () => {
  afterEach(cleanup);
  it("Should render the Navbar component", () => {
    render(
      <MemoryRouter>
        <Navbar toggleAsideBar={() => null} />
      </MemoryRouter>
    );
  });
});
