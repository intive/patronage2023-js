import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { CustomDatePicker } from "ui";
import React from "react";

export default {
  title: "CustomDatePicker",
  component: CustomDatePicker,
} as ComponentMeta<typeof CustomDatePicker>;

const Wrapper = styled.div`
  width: 311px;
`;

const Template: ComponentStory<typeof CustomDatePicker> = ({ ...args }) => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Wrapper>
      <CustomDatePicker
        {...args}
        onSelect={(date) => setValue(date)}
        selected={value}
      />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "Label",
};
