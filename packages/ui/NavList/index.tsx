"use client";
import styled from "styled-components";
import { NavItem } from "ui";
import React, { ReactElement } from "react";
import { usePathname } from "next/navigation";

//types of NavItemContents to mark that NavList will receive array full of objects of type below
export type NavItemContents = {
  ComponentToRender?: ReactElement;
  href: string;
  id: string | number;
};

//types of NavList props - NavList will receive props `contents` that will be an Array full of objects of NavItemContents type
export type NavListProps = {
  contents: Array<NavItemContents>;
  onNavListItemClick: () => void;
} & React.HTMLProps<HTMLUListElement>;

const NavListStyled = styled.ul`
  list-style: none;
  width: 100%;
  height: auto;
`;

//wrapper for text coming from ComponentToRender; currently imported in places where NavList is being used
export const SpanStyled = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin-left: 10px;
`;

//div that imitates wrapper for icon, currently imported in places where NavList is being used
//with !important this div will always have bcg on "white", even when `active` prop will change bcg of whole li element on "#F1FBF6"
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white !important;
  padding: 4px 7px;
  border-radius: 8px;
`;

export const NavList = ({ contents, onNavListItemClick }: NavListProps) => {
  const currentPage = usePathname() || "";

  return (
    <NavListStyled>
      {contents.map((content) => {
        return (
          <NavItem
            active={content.href === currentPage}
            key={content.id}
            href={content.href}
            onClick={onNavListItemClick}>
            {content.ComponentToRender}
          </NavItem>
        );
      })}
    </NavListStyled>
  );
};
