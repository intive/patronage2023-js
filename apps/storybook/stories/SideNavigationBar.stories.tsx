import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { SideNavigationBar, Icon, Avatar } from "ui";
import { SpanStyled, NavList } from "ui/NavList";

export default {
  title: "SideNavigationBar",
  component: SideNavigationBar,
} as ComponentMeta<typeof SideNavigationBar>;

const SideNavigationBarTemplate: ComponentStory<typeof SideNavigationBar> = ({
  ...args
}) => {
  const [isNavListItemClicked, setIsNavItemClicked] = useState(false);
  const resetIsNavListItemClicked = () => {
    setIsNavItemClicked(false);
  };

  return (
    <SideNavigationBar
      {...args}
      isNavListItemClicked={isNavListItemClicked}
      resetIsNavListItemClicked={resetIsNavListItemClicked}></SideNavigationBar>
  );
};

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
    href: "/budgets/payments",
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
  navigationList: (
    <NavList
      contents={BudgetsSubMenuNavListContents}
      onNavListItemClick={() => console.log("Submenu should hide now!")}
    />
  ),
  button: {
    method: () => {},
    label: "Add new budget",
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
  navigationList: (
    <NavList
      contents={SettingsSubMenuNavListContents}
      onNavListItemClick={() => console.log("Submenu should hide now!")}
    />
  ),
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
      href: "/settings",
      icon: <Icon icon="settings" iconSize={30} />,
      textValue: "Settings",
      subMenu: SettingsSubMenuData,
      id: 3,
    },
  ],
  pathname: "/reports",
};
