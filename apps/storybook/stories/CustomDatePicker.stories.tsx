import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { CustomDatePicker } from "ui";

export default {
  title: "CustomDatePicker",
  component: CustomDatePicker,
} as ComponentMeta<typeof CustomDatePicker>;

const Wrapper = styled.div`
  width: 311px;
  font-family: "Inter";
`;

const Template: ComponentStory<typeof CustomDatePicker> = ({ ...args }) => (
  <Wrapper>
    <CustomDatePicker {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Placeholder",
  onSelect: (date: Date) => {
    console.log(date);
  },
};

export const TranslatedToPolish = Template.bind({});
TranslatedToPolish.args = {
  placeholder: "Zaślepka",
  onSelect: (date: Date) => {
    console.log(date);
  },
  lang: "pl",
};
