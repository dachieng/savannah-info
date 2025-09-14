/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: string | Record<string, any>): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeRequired(): R;
      toBeInvalid(): R;
      toBeValid(): R;
      toHaveValue(value: string | number): R;
      toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveFocus(): R;
      toHaveFormValues(expectedValues: Record<string, any>): R;
      toHaveErrorMessage(text: string | RegExp): R;
      toHaveDescription(text: string | RegExp): R;
      toHaveAccessibleName(text: string | RegExp): R;
      toHaveAccessibleDescription(text: string | RegExp): R;
    }
  }
}
