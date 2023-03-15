import React from "react";
import "material-symbols";
import styled, { css } from "styled-components";

type styledIconProps = {
  color?: string;
  variant: "filled" | "outlined";
} & React.HTMLProps<HTMLSpanElement>;

type IconProps = {
  icon: "home" | "add" | "bar_chart";
} & styledIconProps;

export const StyledIcon = styled.span<styledIconProps>`
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
