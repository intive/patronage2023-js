"use client";
import styled from "styled-components";
import { Icon } from "ui";
import { IconType } from "../Icon";

export type TrendChipProps = {
  value: number;
  ariaLabel?: string;
} & React.HTMLProps<HTMLDivElement>;

export const TrendChipStyled = styled.div<TrendChipProps>`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 4px;
  width: fit-content;
  line-height: 16px;
  font-size: 12px;
  padding: 2px 8px;
  font-weight: 600;
  border-radius: 30px;
  color: ${({ value, theme }) => {
    if (value < 0) {
      return theme.trendChip.negativeValue.color;
    } else if (value > 0) {
      return theme.trendChip.positiveValue.color;
    }
    return theme.trendChip.zeroValue.color;
  }};
  border: 2px solid
    ${({ value, theme }) => {
      if (value < 0) {
        return theme.trendChip.negativeValue.border;
      } else if (value > 0) {
        return theme.trendChip.positiveValue.border;
      }
      return theme.trendChip.zeroValue.border;
    }};
`;

export const TrendChip = ({ value, ariaLabel }: TrendChipProps) => {
  const iconName = (): IconType => {
    if (value === 0) return "trending_flat";
    if (value < 0) return "trending_down";
    return "trending_up";
  };

  //because we can't use dictionnary in /ui folder, ariaLabel is passed by prop.
  //example of use: in the place of component's consumption : ariaLabel={t(trendChip.text) + `${value}%`}/>
  //with that, we can use the dictionnary and pass proper value dynamically

  return (
    <TrendChipStyled role="status" value={value} aria-label={ariaLabel}>
      <Icon icon={iconName()} iconSize={15} />
      <span>{Math.abs(value)}%</span>
    </TrendChipStyled>
  );
};
