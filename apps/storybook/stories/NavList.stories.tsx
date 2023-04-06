import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import { NavList, Avatar } from "ui";
import { dummyNavItemContents as dummyNavItemContentsWithIcon } from "../../web/app/NavListDemo";
import { NavItemContents } from "ui/NavList";

//imported dummyNavItemContents to already have contents with icon.
//creating second set of dummy NavItem contents here, but only with text.
const dummyNavItemContentsTextOnly: Array<NavItemContents> = [
  {
    title: "Bills",
    href: "",
    id: 1,
  },
  {
    title: "Subscriptions",
    href: "",
    id: 2,
  },
  {
    title: "Savings",
    href: "",
    id: 3,
  },
];

//creating AvatarStyled in the aim of adjusting size of Avatar component
const AvatarStyled = styled(Avatar)`
  width: 28px;
  height: 28px;
`;

const dummyNavItemContentsWithAvatar: Array<NavItemContents> = [
  {
    title: "Leonard Hofstadter",
    href: "",
    componentToRender: <AvatarStyled src="/avatar.svg" />,
    id: 1,
  },
  {
    title: "Howard Wolowitz",
    href: "",
    componentToRender: <AvatarStyled src="/avatar.svg" />,
    id: 2,
  },
  {
    title: "Rajesh Kotthrappall",
    href: "",
    componentToRender: <AvatarStyled src="/avatar.svg" />,
    id: 3,
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

//wrapper imitating parent element of NavList - for proper display on storybook
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
