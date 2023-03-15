import React from "react";
import "material-symbols";
import styled, { css } from "styled-components";

type styledIconProps = {
  color?: string;
  variant: "filled" | "outlined";
} & React.HTMLProps<HTMLSpanElement>;

type IconProps = {
  //Map it to more friendly names or keep them as default?
  icon:
    | "home"
    | "add"
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
  cursor: pointer;
  font-variation-settings: "FILL" 0;

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ variant }) =>
    variant === "filled" &&
    css`
      font-variation-settings: "FILL" 1;
    `}
`;

export const Icon = ({
  icon,
  variant = "outlined",
  color = "black",
}: IconProps) => {
  return (
    <StyledIcon
      color={color}
      className="material-symbols-rounded"
      variant={variant}
    >
      {icon}
    </StyledIcon>
  );
};
