import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { SideNavigationBar } from "ui";
import { Icon } from "ui";
import { SpanStyled } from "ui/NavList";
import { NavList } from "ui/NavList";
import { Avatar } from "ui";

export default {
  title: "SideNavigationBar",
  component: SideNavigationBar,
} as ComponentMeta<typeof SideNavigationBar>;

const Wrapper = styled.div`
  display: flex;
`;

const SideNavigationBarTemplate: ComponentStory<typeof SideNavigationBar> = ({
  ...args
}) => (
  <Wrapper>
    <SideNavigationBar {...args}></SideNavigationBar>
  </Wrapper>
);

const AvatarStyled = styled(Avatar)`
  width: 28px;
  height: 28px;
`;

const BudgetsSubMenuNavListContents = [
  {
    ComponentToRender: (
      <>
        <Icon icon="payments" iconSize={30} />
        <SpanStyled>Bills</SpanStyled>
      </>
    ),
    href: "/reports",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <Icon icon="subscriptions" iconSize={30} />
        <SpanStyled>Subscriptions</SpanStyled>
      </>
    ),
    href: "/budgets/subscriptions",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <Icon icon="savings" iconSize={30} />
        <SpanStyled>Savings</SpanStyled>
      </>
    ),
    href: "/budgets/savings",
    id: 3,
  },
];

const TeamSubMenuNavListContents = [
  {
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatars/1.svg/" username="Leonard Hofstadter" />
        <SpanStyled>Leonard Hofstadter</SpanStyled>
      </>
    ),
    href: "/team/1",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatars/2.svg/" username="Howard Wolowitz" />
        <SpanStyled>Howard Wolowitz</SpanStyled>
      </>
    ),
    href: "/team/2",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatars/3.svg/" username="Rajesh Koothrappali" />
        <SpanStyled>Rajesh Koothrappali</SpanStyled>
      </>
    ),
    href: "/team/3",
    id: 3,
  },
];

const BudgetsSubMenuData = {
  title: "Budgets",
  sort: {
    method: () => {},
    icon: <Icon icon="filter_list" />,
  },
  searchInput: {
    placeholder: "Search budgets",
    icon: <Icon icon="search" />,
  },
  navigationList: <NavList contents={BudgetsSubMenuNavListContents} />,
  button: {
    method: () => {},
    label: "Add new budget",
  },
};

const TeamSubMenuData = {
  title: "Team",
  sort: {
    method: () => {},
    icon: <Icon icon="filter_list" />,
  },
  searchInput: {
    icon: <Icon icon="search" />,
    placeholder: "Search team",
  },
  navigationList: <NavList contents={TeamSubMenuNavListContents} />,
  button: {
    method: () => {},
    label: "Add new member",
  },
};

const SettingsSubMenuNavListContents = [
  {
    ComponentToRender: (
      <>
        <span>Edit profile</span>
      </>
    ),
    href: "/settings/edit-profile",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <span>Change password</span>
      </>
    ),
    href: "/settings/change-password",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <span>Language</span>
      </>
    ),
    href: "/settings/change-language",
    id: 3,
  },
];

const SettingsSubMenuData = {
  title: "Settings",
  navigationList: <NavList contents={SettingsSubMenuNavListContents} />,
};

export const SideNavBar = SideNavigationBarTemplate.bind({});
SideNavBar.args = {
  items: [
    {
      href: "/budgets",
      icon: <Icon icon="wallet" iconSize={30} />,
      textValue: "Budgets",
      subMenu: BudgetsSubMenuData,
      id: 1,
    },
    {
      href: "/reports",
      icon: <Icon icon="query_stats" iconSize={30} />,
      textValue: "Reports",
      id: 2,
    },
    {
      href: "/team",
      icon: <Icon icon="account_circle" iconSize={30} />,
      textValue: "Team",
      subMenu: TeamSubMenuData,
      id: 3,
    },
    {
      href: "/settings",
      icon: <Icon icon="settings" iconSize={30} />,
      textValue: "Settings",
      subMenu: SettingsSubMenuData,
      id: 4,
    },
  ],
  pathname: "/reports",
};
