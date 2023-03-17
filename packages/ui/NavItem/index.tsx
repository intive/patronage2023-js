"use client";

import styled from "styled-components";
import "material-symbols";

export type NavItemProps = {
    active?: boolean,
} & React.HTMLProps<HTMLLIElement>;


// why I use min-width:0; https://css-tricks.com/flexbox-truncated-text/
export const ChildrenWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex-basis:80%;
  min-width:0;
`
export const ArrowWrapper = styled.div`
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
`;

export const NavItem = ({
  active = false,
  children,
}: NavItemProps) => {

  return (
    <NavItemStyled active={active}>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
      <ArrowWrapper>{active && <span className="material-symbols-outlined">chevron_right</span>}</ArrowWrapper>
    </NavItemStyled>
  );
};
