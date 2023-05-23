import React from "react";
import { ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import { CategoryIcon, CategoryIconProps } from "ui";

export default {
  title: "Category Icon",
  component: CategoryIcon,
} as ComponentMeta<typeof CategoryIcon>;

type WrapperProps = {
  small?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  font-size: ${({ small }) => (small ? "14px" : "16px")};
`;

const Template = ({ ...args }: CategoryIconProps) => (
  <Wrapper small={args.small}>
    <CategoryIcon {...args} />
  </Wrapper>
);

export const HomeSpendings = Template.bind({});
HomeSpendings.args = {
  small: false,
  category: {
    id: 1,
    name: "Home spendings",
    icon: {
      name: "home",
      foreground: "#1E4C40",
      background: "#F1FBF6",
    },
  },
};

export const Subscriptions = Template.bind({});
Subscriptions.args = {
  small: false,
  category: {
    id: 2,
    name: "Subscriptions",
    icon: {
      name: "subscriptions",
      foreground: "#643400",
      background: "#FFF3E5",
    },
  },
};

export const Car = Template.bind({});
Car.args = {
  small: false,
  category: {
    id: 3,
    name: "Car",
    icon: {
      name: "directions_car",
      foreground: "#003150",
      background: "#E0F3FF",
    },
  },
};

export const Grocery = Template.bind({});
Grocery.args = {
  small: false,
  category: {
    id: 4,
    name: "Grocery",
    icon: {
      name: "shopping_cart",
      foreground: "#5A092F",
      background: "#FDE7F1",
    },
  },
};
