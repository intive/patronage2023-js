"use client";
import styled from "styled-components";
import { Icon } from "ui";

export type TrendChipProps = {
  value: number;
} & React.HTMLProps<HTMLDivElement>;

export const TrendChipStyled = styled.div<TrendChipProps>`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 4px;
  line-height: 16px;
  font-size: 12px;
  padding: 2px 28px;
  font-weight: 600;
  border-radius: 30px;
  color: ${({ value, theme }) =>
    value > 0
      ? theme.trendChip.positiveValue.color
      : theme.trendChip.negativeValue.color};
  border: 2px solid
    ${({ value, theme }) =>
      value > 0
        ? theme.trendChip.positiveValue.border
        : theme.trendChip.negativeValue.border};
`;

export const TrendChip = ({ value }: TrendChipProps) => {
  const displayedIcon =
    value > 0 ? (
      <Icon icon="trending_up" iconSize={15} />
    ) : (
      <Icon icon="trending_down" iconSize={15} />
    );
  const displayedValue =
    value > 0 ? <span>{value}%</span> : <span>{Math.abs(value)}%</span>;

  return (
    <TrendChipStyled value={value}>
      {displayedIcon}
      {displayedValue}
    </TrendChipStyled>
  );
};
