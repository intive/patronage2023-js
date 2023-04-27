import styled, { css } from "styled-components";

export type ChipProps = {
  type: "Done" | "Due" | "Cancelled";
} & React.HTMLProps<HTMLSpanElement>;

export const ChipStyled = styled.span<ChipProps>`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  border-radius: 16px;
  padding: 4px 16px;

  ${({ type }) =>
    (type === "Done" &&
      css`
        color: ${({ theme }) => theme.chip.completed.main};
        background: ${({ theme }) => theme.chip.completed.background};
      `) ||
    (type === "Due" &&
      css`
        color: ${({ theme }) => theme.chip.due.main};
        background: ${({ theme }) => theme.chip.due.background};
      `) ||
    (type === "Cancelled" &&
      css`
        color: ${({ theme }) => theme.chip.failed.main};
        background: ${({ theme }) => theme.chip.failed.background};
      `)}
`;

export const Chip = ({ type, children }: ChipProps) => {
  return <ChipStyled type={type}>{children}</ChipStyled>;
};
