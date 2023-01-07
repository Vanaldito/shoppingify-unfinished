import { useState } from "react";
import FormField from "./FormField";

interface FieldWithSuggestionsProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  selectSuggestion: (suggestion: string) => void;
  suggestions: null | string[];
}
export default function FieldWithSuggestions({
  selectSuggestion,
  suggestions,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: FieldWithSuggestionsProps) {
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  function focusHandler(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(true);

    onFocus && onFocus(event);
  }

  function blurHandler(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(false);
    setSelectedSuggestionIndex(-1);

    onBlur && onBlur(event);
  }

  function mouseOverHandler(index: number) {
    return () => setSelectedSuggestionIndex(index);
  }

  function mouseLeaveHandler() {
    setSelectedSuggestionIndex(-1);
  }

  function mouseDownHandler(suggestion: string) {
    return () => selectSuggestion(suggestion);
  }

  function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    const maxIndex = (suggestions?.length ?? 0) - 1;

    if (maxIndex !== -1) {
      switch (event.key) {
        case "ArrowDown":
          setSelectedSuggestionIndex(index =>
            index + 1 > maxIndex ? 0 : index + 1
          );
          break;
        case "ArrowUp":
          setSelectedSuggestionIndex(index =>
            index - 1 < 0 ? maxIndex : index - 1
          );
          break;
        case "Enter":
          if (selectedSuggestionIndex !== -1) {
            event.preventDefault();
            suggestions &&
              selectSuggestion(suggestions[selectedSuggestionIndex]);
          }
      }
    }

    onKeyDown && onKeyDown(event);
  }

  return (
    <div className="field-with-suggestions">
      <FormField
        onKeyDown={keyDownHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        {...props}
      />
      {isFocused && suggestions && suggestions.length > 0 && (
        <ul className="field-with-suggestions__suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`field-with-suggestions__suggestion ${
                selectedSuggestionIndex === index
                  ? "field-with-suggestions__suggestion--selected"
                  : ""
              }`.trim()}
              onMouseOver={mouseOverHandler(index)}
              onMouseLeave={mouseLeaveHandler}
              onMouseDown={mouseDownHandler(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
