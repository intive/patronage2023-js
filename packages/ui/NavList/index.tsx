//NavList która bedzie korzystac z NavItem

"use client";

import * as React from "react";
import styled, { css } from "styled-components";


export type NavListProps = {
//variant?:
} & React.HTMLProps<HTMLUListElement>;

const NavListStyled = styled.ul`
    list-style: none;
    width:350px;
    height:auto;
`

export const NavList = ({
    children
  }: NavListProps) => {
    return (
      <NavListStyled>
       {children}
      </NavListStyled>
    );
  };
  
