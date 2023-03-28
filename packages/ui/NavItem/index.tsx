"use client";

import styled from "styled-components";
import "material-symbols";
import { Icon } from "ui";
import Link from 'next/link'

//types of NavItem props
export type NavItemProps = {
    active: boolean,
    onClick: Function,
    href:string,
} & React.HTMLProps<HTMLAnchorElement>;

// why I use min-width:0; https://css-tricks.com/flexbox-truncated-text/
export const ChildrenWrapper = styled.div`
  display:flex;
  justify-content: flex-start;
  gap:10px;
  align-items: center;
  flex-basis:80%;
  min-width:0;
`
export const ArrowWrapper = styled.div<NavItemProps>`
  display:flex;
  justify-content: center;
  align-items: center;
`
export const NavItemStyled = styled(Link)<NavItemProps>` 
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 100%;
  color: ${({active}) => active? "#05400A" : "#515151"}; 
  background-color: ${({active}) => active?  "#F1FBF6" : "transparent"};
  font-size:15px;
  padding: 15px 10px;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight:600;
  overflow: hidden;
  cursor:pointer;
  text-decoration:none;

  &:hover{
    background-color:#F1FBF6;
  }
`;

export const NavItem = ({
  active,
  onClick,
  href,
  children,
}: NavItemProps) => {

  return (
    <NavItemStyled active={active} onClick={onClick} href={href}>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
      {active && <Icon icon="chevron_right" color="#1E4C40"></Icon>}
    </NavItemStyled>
  );
};
