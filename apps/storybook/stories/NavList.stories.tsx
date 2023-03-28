import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import { NavList } from "ui";
import {dummyNavItemContents} from "../../web/app/NavListDemo"
import { NavItemContents } from "ui/NavList";

//imported dummyNavItemContents to already have contents with icon.
//creating second set of dummy NavItem contents here, but only with text.
const dummyNavItemContentsTextOnly: Array<NavItemContents> = [
  {
      title: "Bills",
      href: "#",
      id: 1,
  },
  {
      title: "Subscriptions",
      href: "#",
      id: 2,
  },
  {
      title: "Savings",
      href: "#",
      id: 3,
  }
];

export default {
  title: "Nav List",
  component: NavList,
  parameters: {
    docs: {
      description: {
        component: 'Navigation list that positions its children vertically at full width. ',
      },
    },
  },
} as ComponentMeta<typeof NavList>;

//wrapper imitating parent element of NavList - for proper display on storybook
const NavListWrapper = styled.div`
  width:20%;
`
const Template: ComponentStory<typeof NavList> = ({ ...args }) => (
  <NavListWrapper><NavList {...args}/></NavListWrapper>
);

//list with list items that include icon and text
export const ListWithTextAndIcons = Template.bind({});
ListWithTextAndIcons.args = {
  contents:dummyNavItemContents,
};

//list with list items that include text only
export const ListWithText = Template.bind({});
ListWithText.args = {
  contents:dummyNavItemContentsTextOnly,
}
