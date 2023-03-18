import { useState } from "react";
import styled, { css } from "styled-components";

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
} & React.HTMLProps<HTMLDivElement>;

export const SideNavigationBarItemStyled = styled.div<SideNavigationBarItemProps>`
  display: flex;
  flex-direction: column;
  padding-left: 6px;
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
    >
      {children}
      <span style={{ fontSize: 10 }}>{textValue}</span>
    </SideNavigationBarItemStyled>
  );
};
