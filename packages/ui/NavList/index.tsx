"use client";
import styled from "styled-components";
import React, { ReactElement, ReactNode, forwardRef } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { Spinner } from "./Spinner";
import { Icon } from "../Icon";

//types of NavItemContents to mark that NavList will receive array full of objects of type below
export type NavItemContents = {
  ComponentToRender?: ReactElement;
  href: string;
  id: string | number;
  ref: (budget: HTMLLIElement) => void;
};

//types of NavList props - NavList will receive props `contents` that will be an Array full of objects of NavItemContents type
export type NavListProps = {
  contents: Array<NavItemContents>;
  loading?: ReactNode;
  error?: ReactNode;
  onNavListItemClick: () => void;
} & React.HTMLProps<HTMLUListElement>;

const NavListStyled = styled.ul`
  list-style: none;
  width: 100%;
  height: calc(100vh - 310px);
  padding-right: 12px;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.textarea.disabled};
    border-radius: 10px;
    width: 6px;
    margin-bottom: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.modal.closeButton};
    border-radius: 10px;
  }
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

const WrapperStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  color: #515151;
`;

export const NavList = ({
  contents,
  onNavListItemClick,
  loading,
  error,
}: NavListProps) => {
  const currentPage = usePathname() || "";
  return (
    <NavListStyled>
      {contents &&
        contents.map((content) => {
          return (
            <NavItem
              ref={content.ref}
              active={content.href === currentPage}
              key={content.id}
              href={content.href}
              onClick={onNavListItemClick}>
              {content.ComponentToRender}
            </NavItem>
          );
        })}
      {loading && (
        <WrapperStyled>
          <Spinner />
          <p>Loading</p>
        </WrapperStyled>
      )}
      {error && (
        <WrapperStyled>
          <Icon icon="error" iconSize={50} color="#AB322C" />
          <p>Something went wrong.</p>
        </WrapperStyled>
      )}
    </NavListStyled>
  );
};
