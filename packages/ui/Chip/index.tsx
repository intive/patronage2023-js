import * as React from "react";
import styled, { css } from "styled-components";

/*

WHAT: Transaction status element (chip/badge/pill)

Possible states:

- Completed
- Due
- Recurring
- Overdue
- Cancelled

Specification:

- HTML span element with text value as children
- Span background color and text color depend on the possible state

*/

export type ChipProps = {
  state: "completed" | "due" | "failed";
} & React.HTMLProps<HTMLSpanElement>;

export const ChipsStyled = styled.span<ChipProps>`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  border-radius: 16px;
  padding: 4px 16px;

  ${({ state }) =>
    (state === "completed" &&
      css`
        color: #2e6858;
        background: #d0f5e3;
      `) ||
    (state === "due" &&
      css`
        color: #b96232;
        background: #fcefe7;
      `) ||
    (state === "failed" &&
      css`
        color: #ab322c;
        background: #fceeed;
      `)}
`;

export const Chip = ({ state, children }: ChipProps) => {
  return <ChipsStyled state={state}>{children}</ChipsStyled>;
};
