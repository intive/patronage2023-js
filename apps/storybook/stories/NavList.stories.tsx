import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavList} from "ui";
import { NavItemContents } from "ui/NavList";
import styled from "styled-components";

//creating dummy data for proper display on storybook - one children element inside NavItem
const navItemContents: Array<NavItemContents> = [{ title: "Edit profile", id: 1 }, { title: "Change password", id: 2 }, { title: "Language", id: 3 }];

//creating dummy data for proper display on storybook - two children elements inside NavItem
const navItemContentsIcon: Array<NavItemContents> = [{ title: "Bills", icon: "payments", id: 1 }, { title: "Subscriptions", icon: "subscriptions", id: 2 }, { title: "Savings", icon: "savings", id: 3 }];

const NavListWrapper = styled.div`
  width:30%;
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

const Template: ComponentStory<typeof NavList> = ({ ...args }) => (
  <NavListWrapper><NavList contents = {navItemContentsIcon}/></NavListWrapper>
);


//list with two children elements and one active listItem to show it's behavior in storybook
export const ListWithText = Template.bind({});
ListWithText.args = {

}

// ListWithIconAndText.parameters = {
//   docs: {
//     description: {
//       story: 'Imitation of component\'s behavior - when item has been clicked, it changes its color, background color and adds an icon on the right. `Children` props contains two elements.',
//     },
//   },
// };
