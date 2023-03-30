import { css } from "styled-components";
import { styled } from "ui/theme";

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
        color: ${({ theme }) => theme.chip.completed.main};
        background: ${({ theme }) => theme.chip.completed.background};
      `) ||
    (type === "due" &&
      css`
        color: ${({ theme }) => theme.chip.due.main};
        background: ${({ theme }) => theme.chip.due.background};
      `) ||
    (type === "failed" &&
      css`
        color: ${({ theme }) => theme.chip.failed.main};
        background: ${({ theme }) => theme.chip.failed.background};
      `)}
`;

export const Chip = ({ type, children }: ChipProps) => {
  return <ChipStyled type={type}>{children}</ChipStyled>;
};
