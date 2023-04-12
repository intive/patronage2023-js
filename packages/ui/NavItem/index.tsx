"use client";

import styled from "styled-components";
import { Icon } from "ui";
import Link from "next/link";

//types of NavItem props
export type NavItemProps = {
  active: boolean;
  href: string;
} & React.HTMLProps<HTMLAnchorElement>;

// why I use min-width:0; https://css-tricks.com/flexbox-truncated-text/
export const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  flex-basis: 80%;
  min-width: 0;
`;
export const ArrowWrapper = styled.div<NavItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NavItemStyled = styled(Link)<NavItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 100%;
  color: ${({ active, theme }) =>
    active
      ? theme.navList.navItem.activeColor
      : theme.navList.navItem.inactiveColor};
  background-color: ${({ active, theme }) =>
    active
      ? theme.navList.navItem.activeBackground
      : theme.navList.navItem.inactiveBackground};
  font-size: 15px;
  padding: 15px 10px;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  &:hover,&:focus {
    background-color: ${({ theme }) => theme.navList.navItem.hoverAndFocusBackground};
  }
  &:focus{
    outline: 1px solid ${({ theme }) => theme.navList.navItem.focusOutline}
  }
`;

export const NavItem = ({ active, href, children }: NavItemProps) => {
  return (
    <NavItemStyled active={active} href={href}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      {active && <Icon icon="chevron_right" color="#1E4C40" iconSize={18}/>}
    </NavItemStyled>
  );
};
