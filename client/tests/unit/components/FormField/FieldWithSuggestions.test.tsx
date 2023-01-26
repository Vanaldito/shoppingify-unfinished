import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FieldWithSuggestions } from "../../../../src/components";

describe("<FieldWithSuggestions />", () => {
  afterEach(cleanup);

  it("Should render the FieldWithSuggestions component", () => {
    render(
      <FieldWithSuggestions selectSuggestion={() => null} suggestions={null} />
    );
  });

  it("Should render an input element", () => {
    render(
      <FieldWithSuggestions selectSuggestion={() => null} suggestions={null} />
    );

    screen.getByRole("textbox");
  });

  it("Should not render a list of suggestions if the input is not focused", () => {
    render(
      <FieldWithSuggestions
        selectSuggestion={() => null}
        suggestions={["A", "B", "C"]}
      />
    );

    expect(() => screen.getByRole("list")).toThrow();
  });

  it("Should not render a list of suggestions if there are not suggestions", async () => {
    const user = userEvent.setup();
    render(
      <FieldWithSuggestions selectSuggestion={() => null} suggestions={[]} />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    await user.click(inputElement);

    expect(() => screen.getByRole("list")).toThrow();
  });

  it("Should render a list of suggestions when the input is focused and there are suggestions", async () => {
    const user = userEvent.setup();
    render(
      <FieldWithSuggestions
        selectSuggestion={() => null}
        suggestions={["A", "B", "C"]}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    await user.click(inputElement);

    screen.getByRole("list");
  });

  it("Should call the selectSuggestion function when a suggestion is clicked", async () => {
    const user = userEvent.setup();

    const selectSuggestion = vi.fn();
    render(
      <FieldWithSuggestions
        selectSuggestion={selectSuggestion}
        suggestions={["A", "B", "C"]}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    await user.click(inputElement);

    await Promise.all(
      screen.getAllByRole("listitem").map(el => user.click(el))
    );

    expect(selectSuggestion).toHaveBeenCalledTimes(3);
  });

  it("Should allow to select the next and previous suggestions with keyboard", async () => {
    const user = userEvent.setup();

    let selectedSuggestion = null;
    const selectSuggestion = vi.fn((suggestion: string) => {
      selectedSuggestion = suggestion;
    });
    render(
      <FieldWithSuggestions
        selectSuggestion={selectSuggestion}
        suggestions={["A", "B", "C"]}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    await user.click(inputElement);

    await user.type(inputElement, "{ArrowDown}{Enter}");

    expect(selectSuggestion).toHaveBeenCalledTimes(1);
    expect(selectedSuggestion).toBe("A");

    await user.type(inputElement, "{ArrowDown}{ArrowDown}{Enter}");

    expect(selectSuggestion).toHaveBeenCalledTimes(2);
    expect(selectedSuggestion).toBe("C");

    await user.type(inputElement, "{ArrowUp}{Enter}");

    expect(selectSuggestion).toHaveBeenCalledTimes(3);
    expect(selectedSuggestion).toBe("B");
  });
});
