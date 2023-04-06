"use client";

import { NavList, Icon } from "ui";
import { NavItemContents, IconWrapper } from "ui/NavList";
import styled from "styled-components";

//creating array of objects for NavList props
//key componentToRender can accept Avatar component or Icon component, depends on need
//using `IconWrapper` for `Icon` because icon has to have wrapper with padding, that change it's color depends on active prop
//for `Avatar`, `StyledAvatar` must be created => to adjust size of Avatar in each NavItem
export const dummyNavItemContents: Array<NavItemContents> = [
  {
    title: "Bills",
    componentToRender: (
      <IconWrapper>
        <Icon icon="payments" color="#1E4C40" />
      </IconWrapper>
    ),
    href: "/",
    id: 1,
  },
  {
    title: "Subscriptions",
    componentToRender: (
      <IconWrapper>
        <Icon icon="subscriptions" color="#1E4C40" />
      </IconWrapper>
    ),
    href: "",
    id: 2,
  },
  {
    title: "Savings",
    componentToRender: (
      <IconWrapper>
        <Icon icon="savings" color="#1E4C40" />
      </IconWrapper>
    ),
    href: "",
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
