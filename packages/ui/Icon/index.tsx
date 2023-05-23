import React from "react";
import "material-symbols";
import styled, { css } from "styled-components";

export type IconType =
  | "home"
  | "add"
  | "cancel"
  | "bar_chart"
  | "settings"
  | "account_circle"
  | "check_box"
  | "edit"
  | "history"
  | "visibility"
  | "check_indeterminate_small"
  | "trending_up"
  | "search"
  | "filter_list"
  | "sort"
  | "delete"
  | "close"
  | "check_box_outline_blank"
  | "person_add"
  | "notifications"
  | "visibility_off"
  | "event"
  | "trending_down"
  | "arrow_drop_down"
  | "arrow_back"
  | "arrow_forward"
  | "chevron_left"
  | "chevron_right"
  | "radio_button_checked"
  | "error"
  | "schedule"
  | "check"
  | "area_chart"
  | "shopping_cart"
  | "drafts"
  | "more_vert"
  | "wallet"
  | "menu"
  | "drag_handle"
  | "radio_button_unchecked"
  | "help"
  | "arrow_drop_up"
  | "check_small"
  | "query_stats"
  | "savings"
  | "directions_car"
  | "payments"
  | "subscriptions"
  | "done"
  | "priority_high"
  | "navigate_before"
  | "navigate_next"
  | "trending_flat"
  | "currency_exchange"
  | "file_download"
  | "file_upload";

type styledIconProps = {
  color?: string;
  filled?: boolean;
  iconSize?: number;
} & React.HTMLProps<HTMLSpanElement>;

export type IconProps = {
  icon: IconType;
} & styledIconProps;

export const StyledIcon = styled.span<styledIconProps>`
  font-variation-settings: "FILL" 0;
  font-weight: 600;
  ${({ iconSize }) =>
    iconSize &&
    css`
      font-size: ${iconSize}px;
    `}

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
  

  ${({ filled }) =>
    filled &&
    css`
      font-variation-settings: "FILL" 1;
    `}
`;

export const Icon = ({
  icon,
  filled = false,
  color,
  iconSize,
  className,
}: IconProps) => {
  return (
    <StyledIcon
      color={color}
      className={`material-symbols-rounded ${className || ""}`}
      iconSize={iconSize}
      filled={filled}>
      {icon}
    </StyledIcon>
  );
};
