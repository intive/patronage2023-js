"use client";

import styled from "styled-components";
import "material-symbols";
import { Icon,LinkComponent } from "ui";

export type NavItemProps = {
    title: string,
    active: boolean,
    onClick: Function,
} & React.HTMLProps<HTMLLIElement>;

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
export const NavItemStyled = styled.li<NavItemProps>` 
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
  font-weight:500;
  overflow: hidden;
  cursor:pointer;

  &:hover{
    background-color:#F1FBF6;
  }
`;

export const NavItem = ({
  title,
  active,
  onClick,
  children,
}: NavItemProps) => {

  return (
    <NavItemStyled active={active} onClick={onClick} title={title}>
      <ChildrenWrapper>
        {children}
        <LinkComponent href={""}>{title}</LinkComponent>
      </ChildrenWrapper>
      {active && <Icon icon="chevron_right" color="#1E4C40"></Icon>}
    </NavItemStyled>
  );
};


//change navitems into links - make link filling its parent, so its clickable on it's whole width/height.
//but i don't have possibility to style LinkComponent. I cant use only  LinkComponent because i need props on each item that are not available on LinkComponent.
//i need wrapper fro each Link. Problems width appearance and with props.  
