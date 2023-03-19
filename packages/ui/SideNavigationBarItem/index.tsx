import { useState } from "react";
import styled, { css } from "styled-components";
import { Icon } from "ui";
import { IconProps } from "../Icon";

/*
Side navigation item:
HTML div element containing children: Icon component and HTML span text
dedicated icon 
text below icon
Active state: green color, left green border.
Inactive: gray color.
Hover: unspecified in design (probably green color similar to active state but without border?)
*/

export type SideNavigationBarItemProps = {
  activeFlag?: boolean;
  onClick?: Function;
  children: React.ReactNode;
  textValue: string;
} & React.HTMLProps<HTMLDivElement> &
  IconProps;

// TODO: take care of padding and try to create a whole side navigation bar with couple of items!

export const SideNavigationBarItemStyled = styled.div<SideNavigationBarItemProps>`
  /* display: flex; */
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  padding: 7px 14px 7px 14px;
  color: #7e7e7e;
  ${({ activeFlag }) =>
    activeFlag &&
    css`
      border-left: 3px solid #459175;
      color: #1e4c40;
    `}
`;

export const SideNavigationBarItem = ({
  children,
  icon,
  textValue,
}: SideNavigationBarItemProps) => {
  const [active, setActive] = useState(false);

  return (
    <SideNavigationBarItemStyled
      activeFlag={active}
      onClick={() => {
        setActive(!active);
      }}
      textValue={textValue}
      icon={icon}
    >
      <Icon icon={icon} iconSize={30} color={active ? "#1e4c40" : "#7e7e7e"} />
      <span style={{ fontSize: 10 }}>{textValue}</span>
    </SideNavigationBarItemStyled>
  );
};
