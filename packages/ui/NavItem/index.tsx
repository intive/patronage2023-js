"use client";

import styled from "styled-components";
import { Icon } from "ui";
import Link from "next/link";

//types of NavItem props
export type NavItemProps = {
  active: boolean;
  href: string;
  onClick: () => void;
} & React.HTMLProps<HTMLAnchorElement>;

type NavItemPropsTransient = Omit<NavItemProps, "active"> & {
  $active: boolean;
};

// why I use min-width:0; https://css-tricks.com/flexbox-truncated-text/
export const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  flex-basis: 80%;
  min-width: 0;
`;
export const ArrowWrapper = styled.div<NavItemPropsTransient>`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NavItemStyled = styled(Link)<NavItemPropsTransient>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 100%;
  color: ${({ $active, theme }) =>
    $active
      ? theme.navList.navItem.activeColor
      : theme.navList.navItem.inactiveColor};
  background-color: ${({ $active, theme }) =>
    $active
      ? theme.navList.navItem.activeBackground
      : theme.navList.navItem.inactiveBackground};
  font-size: 15px;
  padding: 15px 10px;
  border-radius: 8px;
  font-weight: 500;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.navList.navItem.hoverAndFocusBackground};
  }
  &:focus {
    outline: 1px solid ${({ theme }) => theme.navList.navItem.focusOutline};
  }
`;

export const NavItem = ({ active, href, children, onClick }: NavItemProps) => {
  return (
    <li>
      <NavItemStyled $active={active} href={href} onClick={onClick}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        {active && <Icon icon="chevron_right" color="#1E4C40" iconSize={18} />}
      </NavItemStyled>
    </li>
  );
};
