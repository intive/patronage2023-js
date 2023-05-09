"use client";
import styled from "styled-components";
import { Icon } from "ui";

export type TrendChipProps = {
  value: number;
} & React.HTMLProps<HTMLDivElement>;

export const TrendChipStyled = styled.div<TrendChipProps>`
  font-weight: 600;
  font-size: 12px;
  border-radius: 16px;
  padding: 4px 16px;
  color: ${({ value, theme }) =>
    value > 0 ? theme.trendChip.positiveValue : theme.trendChip.negativeValue};
  border: 1px solid
    ${({ value, theme }) =>
      value > 0
        ? theme.trendChip.positiveValue
        : theme.trendChip.negativeValue};
`;
export const Chip = ({ value }: TrendChipProps) => {
  const displayedIcon =
    value > 0 ? <Icon icon="trending_up" /> : <Icon icon="trending_down" />;
  const displayedValue = value > 0 ? <p>{value}</p> : <p>{Math.abs(value)}</p>;

  return (
    <TrendChipStyled value={value}>
      {displayedIcon}
      {displayedValue}
    </TrendChipStyled>
  );
};
