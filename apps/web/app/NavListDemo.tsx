"use client";
import { NavList, Icon } from "ui";
import { NavItemContents, IconWrapper, SpanStyled } from "ui/NavList";
import styled from "styled-components";
import { usePathname } from "next/navigation";

//creating array of objects for NavList props
//ComponentToRender stands for any `children` element for NavItem
//using `IconWrapper` for `Icon` because icon has to have wrapper with padding, that change it's color depends on active prop
//for `Avatar`, `StyledAvatar` must be created => to adjust size of Avatar in each NavItem
export const dummyNavItemContents: Array<NavItemContents> = [
  {
    ComponentToRender: (
      <>
        <IconWrapper>
          <Icon icon="payments" color="#1E4C40" />
        </IconWrapper>
        <SpanStyled>Bills</SpanStyled>
      </>
    ),
    href: "/bills",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <IconWrapper>
          <Icon icon="subscriptions" color="#1E4C40" />
        </IconWrapper>
        <SpanStyled>Subscriptions</SpanStyled>
      </>
    ),
    href: "/subscriptions",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <IconWrapper>
          <Icon icon="savings" color="#1E4C40" />
        </IconWrapper>
        <SpanStyled>Savings</SpanStyled>
      </>
    ),
    href: "/savings",
    id: 3,
  },
];

//NavListWrapper serving as its parent element - proper presentation
const NavListWrapperStyled = styled.div`
  width: 20%;
`;

export default function NavListDemo() {
  return (
    <>
      <NavListWrapperStyled>
        <NavList contents={dummyNavItemContents}></NavList>
      </NavListWrapperStyled>
    </>
  );
}
