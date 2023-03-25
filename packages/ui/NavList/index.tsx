"use client";

import styled from "styled-components";
import { useState } from "react";
import { NavItem, Icon } from "ui";

//creating dummy data 
export type NavItemContents = {
  title: string;
  icon?: "payments" | "subscriptions" | "savings";
  id: number;
};

export type NavListProps = {
  contents: Array<NavItemContents>
} & React.HTMLProps<HTMLUListElement>;

const NavListStyled = styled.ul`
  list-style: none;
  width:100%;
  height:auto;
`

//span that imitates children element - wrapper for text
const SpanStyled = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:100%;
  margin-left:3%;
`

//div that imitates children element - wrapper for icon 
//with !important this div will always have bcg on "white", even when `active` prop will change bcg of whole li element on "#F1FBF6" 
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white !important;
  padding:4px 7px;
  border-radius: 8px;
`

export const NavList = ({
  contents
}: NavListProps) => {
  
  const [isActive,setIsActive] = useState(false)

  const activeElementHandler = () => {
    setIsActive(prevState => !prevState)
  }

  return (
    <NavListStyled>
      {contents.map((content) => {
        return (
          <NavItem active={isActive} onClick={activeElementHandler} key={content.id}>
            {content.icon && 
            <IconWrapper>
              <Icon icon={content.icon} color="#1E4C40" />
            </IconWrapper>}
            <SpanStyled>{content.title}</SpanStyled>
          </NavItem>
        )
      })}
    </NavListStyled>
  );
};
