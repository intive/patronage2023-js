import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavItem, NavList, Icon } from "ui";
import styled from "styled-components";

//creating dummy data for proper display on storybook - one children element inside NavItem
type NavItemContent = {
  title: string;
  active: boolean;
  id:number;
};

const navItemContents: Array<NavItemContent> = [{ title: "Edit profile", active: true, id: 1 }, { title: "Change password", active: false, id: 2 }, { title: "Language", active: false, id: 3 }];

//creating dummy data for proper display on storybook - two children elements inside NavItem
type NavItemContentIcon = {
  title: string;
  active: boolean;
  icon: "payments" | "subscriptions" | "savings";
  id:number;
};

const navItemContentsIcon: Array<NavItemContentIcon> = [{ title: "Bills", active: true, icon: "payments", id: 1 }, { title: "Subscriptions", active: false, icon: "subscriptions", id: 2 }, { title: "Savings", active: false, icon: "savings", id: 3 }];

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

const Template: ComponentStory<typeof NavList> = ({ children, ...args }) => (
  <NavList {...args}>{children}</NavList>
);

export const ElementsInactive = Template.bind({});
ElementsInactive.args = {
  children: (
    <>
      {navItemContents.map((content) => {
        return (
          <NavItem active={false} key={content.id}>
            <SpanStyled>{content.title}</SpanStyled>
          </NavItem>
        )
      })}
    </>
  ),
};

//list with one children element and one active listItem to show it's behavior in storybook
export const OneElementActive = Template.bind({});
OneElementActive.args = {
  children: (
    <>
      {navItemContents.map((content) => {
        return (
          <NavItem active={content.active} key={content.id}>
            <SpanStyled>{content.title}</SpanStyled>
          </NavItem>
        )
      })}
    </>
  )
};

OneElementActive.parameters = {
  docs: {
    description: {
      story: 'Imitation of component\'s behavior - when item has been clicked, it changes its color, background color and adds an icon on the right. `Children` props contains only one element.',
    },
  },
};

//list with two children elements and one active listItem to show it's behavior in storybook
export const ListWithIconAndText = Template.bind({});
ListWithIconAndText.args = {
  children: (
    <>
      {navItemContentsIcon.map((content) => {
        return (
          <NavItem active={content.active} key={content.id}>
            <IconWrapper><Icon icon={content.icon} color="#1E4C40"></Icon></IconWrapper>
            <SpanStyled>{content.title}</SpanStyled>
          </NavItem>
        )
      })}
    </>
  )
};

ListWithIconAndText.parameters = {
  docs: {
    description: {
      story: 'Imitation of component\'s behavior - when item has been clicked, it changes its color, background color and adds an icon on the right. `Children` props contains two elements.',
    },
  },
};