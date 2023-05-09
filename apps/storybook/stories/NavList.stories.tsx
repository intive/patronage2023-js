import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import { Avatar, NavList, NavItemContents, SpanStyled } from "ui";
import { dummyNavItemContents as dummyNavItemContentsWithIcon } from "../../web/app/NavListDemo";

import React from "react";

//imported dummyNavItemContents to already have contents with icon.
//creating second set of dummy NavItem contents here, but only with text.
const dummyNavItemContentsTextOnly: Array<NavItemContents> = [
  {
    ComponentToRender: <SpanStyled>Bills</SpanStyled>,
    href: "/bills",
    id: 1,
    ref: null,
  },
  {
    ComponentToRender: <SpanStyled>Subscriptions</SpanStyled>,
    href: "/subscriptions",
    id: 2,
    ref: null,
  },
  {
    ComponentToRender: <SpanStyled>Savings</SpanStyled>,
    href: "/savings",
    id: 3,
    ref: null,
  },
];

//creating AvatarStyled in the aim of adjusting size of Avatar component
const AvatarStyled = styled(Avatar)`
  width: 28px;
  height: 28px;
`;

const dummyNavItemContentsWithAvatar: Array<NavItemContents> = [
  {
    href: "/user1",
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatar.svg" />
        <SpanStyled>Leonard Hofstadter</SpanStyled>
      </>
    ),
    id: 1,
    ref: null,
  },
  {
    href: "/user2",
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatar.svg" />
        <SpanStyled>Howard Wolowitz</SpanStyled>
      </>
    ),
    id: 2,
    ref: null,
  },
  {
    href: "/user3",
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatar.svg" />
        <SpanStyled>Rajesh Kotthrappall</SpanStyled>
      </>
    ),
    id: 3,
    ref: null,
  },
];

export default {
  title: "Nav List",
  component: NavList,
  parameters: {
    docs: {
      description: {
        component:
          "Navigation list that positions its children vertically at full width. ",
      },
    },
  },
} as ComponentMeta<typeof NavList>;

// wrapper imitating parent element of NavList - for proper display on storybook
const NavListWrapper = styled.div`
  width: 20%;
`;
const Template: ComponentStory<typeof NavList> = ({ ...args }) => (
  <NavListWrapper>
    <NavList {...args} />
  </NavListWrapper>
);

//list with list items that include text only
export const ListWithText = Template.bind({});
ListWithText.args = {
  contents: dummyNavItemContentsTextOnly,
};

//list with list items that include icon and text
export const ListWithTextAndIcons = Template.bind({});
ListWithTextAndIcons.args = {
  contents: dummyNavItemContentsWithIcon,
};

//list with list items that include text only
export const ListWithTextAndAvatars = Template.bind({});
ListWithTextAndAvatars.args = {
  contents: dummyNavItemContentsWithAvatar,
};
