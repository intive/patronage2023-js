import React from "react";
import "material-symbols";
import styled, { css } from "styled-components";

type styledIconProps = {
  color?: string;
  filled?: boolean;
  iconSize?: number;
} & React.HTMLProps<HTMLSpanElement>;

type IconProps = {
  icon:
    | "home"
    | "add"
    | "add_circle"
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
    | "subscriptions";
} & styledIconProps;

export const StyledIcon = styled.span<styledIconProps>`
  font-variation-settings: "FILL" 0;

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
  color = "black",
  iconSize,
}: IconProps) => {
  return (
    <StyledIcon
      color={color}
      className="material-symbols-rounded"
      iconSize={iconSize}
      filled={filled}
    >
      {icon}
    </StyledIcon>
  );
};
