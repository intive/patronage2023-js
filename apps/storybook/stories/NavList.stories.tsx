import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavList} from "ui";
import { NavItemContents } from "ui/NavList";
import styled from "styled-components";
import NavListDemo from "../../web/app/NavListDemo"

// //creating dummy data for proper display on storybook - one children element inside NavItem
// const navItemContents: Array<NavItemContents> = [{ title: "Edit profile",active:false,href:"", id: 1 }, { title: "Change password",active:false,href:"", id: 2 }, { title: "Language",active:false,href:"", id: 3 }];

// //creating dummy data for proper display on storybook - two children elements inside NavItem
// const navItemContentsIcon: Array<NavItemContents> = [{ title: "Bills",active:false,href:"", icon: "payments", id: 1 }, { title: "Subscriptions",active:false,href:"", icon: "subscriptions", id: 2 }, { title: "Savings",active:false,href:"", icon: "savings", id: 3 }];

// const NavListWrapper = styled.div`
//   width:30%;
// `
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
  <NavListDemo/>
);


//list with two children elements and one active listItem to show it's behavior in storybook
export const ListWithItems = Template.bind({});
ListWithItems.args = {

}

// ListWithIconAndText.parameters = {
//   docs: {
//     description: {
//       story: 'Imitation of component\'s behavior - when item has been clicked, it changes its color, background color and adds an icon on the right. `Children` props contains two elements.',
//     },
//   },
// };
