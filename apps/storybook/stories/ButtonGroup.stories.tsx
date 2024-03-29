import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ButtonGroup, Icon } from "ui";

export default {
  title: "ButtonGroup",
  component: ButtonGroup,
  argTypes: {},
} as ComponentMeta<typeof ButtonGroup>;

const FullWidth: ComponentStory<typeof ButtonGroup> = (args) => (
  <div>
    <p>
      This component <u>always</u> fills parent. Both height and width.
    </p>
    <ButtonGroup {...args} />
  </div>
);

const FixedWidth: ComponentStory<typeof ButtonGroup> = (args) => (
  <>
    <p>Parent has fixed width (300px) and component is secondary.</p>
    <div
      style={{
        width: "300px",
      }}>
      <ButtonGroup {...args} />
    </div>
  </>
);

const FullHeight: ComponentStory<typeof ButtonGroup> = (args) => (
  <>
    <p>
      It also takes icons from material-symbol library. In this example parent
      has 100px height and 200px width.
    </p>
    <div
      style={{
        height: "100px",
        width: "200px",
      }}>
      <ButtonGroup {...args} />
    </div>
  </>
);

export const Primary = FullWidth.bind({});
Primary.args = {
  options: [
    {
      component: "View all",
      onSelect: () => {
        console.log("Option 1 selected");
      },
      id: "all",
    },
    {
      component: "Income",
      onSelect: () => {
        console.log("Option 2 selected");
      },
      id: "income",
    },
    {
      component: "Expenses",
      onSelect: () => {
        console.log("Option 3 selected");
      },
      id: "expenses",
    },
  ],
  secondary: false,
};

export const Secondary = FixedWidth.bind({});
Secondary.args = {
  options: [
    {
      component: "Income",
      onSelect: () => {
        console.log("Option 1 selected");
      },
      id: "income",
    },
    {
      component: "Expenses",
      onSelect: () => {
        console.log("Option 2 selected");
      },
      defaultChecked: true,
      id: "expenses",
    },
  ],
  secondary: true,
};

export const Icons = FullHeight.bind({});

Icons.args = {
  options: [
    {
      component: <Icon icon="bar_chart" />,
      onSelect: () => {
        console.log("Option 1 selected");
      },
      id: "bar_chart",
    },
    {
      component: <Icon icon="area_chart" />,
      onSelect: () => {
        console.log("Option 2 selected");
      },
      id: "area_chart",
    },
  ],
  secondary: true,
};
