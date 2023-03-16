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
  type: "completed" | "due" | "failed";
} & React.HTMLProps<HTMLSpanElement>;

export const ChipStyled = styled.span<ChipProps>`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  border-radius: 16px;
  padding: 4px 16px;

  ${({ type }) =>
    (type === "completed" &&
      css`
        color: #2e6858;
        background: #d0f5e3;
      `) ||
    (type === "due" &&
      css`
        color: #b96232;
        background: #fcefe7;
      `) ||
    (type === "failed" &&
      css`
        color: #ab322c;
        background: #fceeed;
      `)}
`;

export const Chip = ({ type, children }: ChipProps) => {
  return <ChipStyled type={type}>{children}</ChipStyled>;
};
