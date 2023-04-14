import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar, Checkbox, Icon } from "ui";
import styled from "styled-components";

export default {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    sizeBig: { control: "boolean" },
    label: { control: "string" },
    id: { control: "string" },
    onChange: { control: "function" },
    value: { control: "string" },
    name: { control: "string" },
  },
} as ComponentMeta<typeof Checkbox>;

const CheckboxTemplate: ComponentStory<typeof Checkbox> = ({
  children,
  ...args
}) => <Checkbox {...args}>{children}</Checkbox>;

const CheckboxWithAvatarChildren = () => {
  return (
    <Wrapper>
      <Avatar username="Rajesh" src="3d_avatar_28.svg" />
      <Text>Rajesh Koothrappali</Text>
    </Wrapper>
  );
};

const CheckboxWithIconChildren = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon icon="home" />
      </IconWrapper>
      <Text>Home spendings</Text>
    </Wrapper>
  );
};

export const NormalCheckbox = CheckboxTemplate.bind({});
NormalCheckbox.args = {
  children: "Stay logged in",
  label: "Label",
  id: "NormalCheckbox",
  name: "Normal",
  sizeBig: false,
};

export const BigCheckbox = CheckboxTemplate.bind({});
BigCheckbox.args = {
  children: "Stay logged in",
  label: "Label",
  id: "BigCheckbox",
  name: "Big",
  sizeBig: true,
};

export const CheckboxWithAvatar = CheckboxTemplate.bind({});
CheckboxWithAvatar.args = {
  children: <CheckboxWithAvatarChildren />,
  label: "Label",
  id: "CheckboxWithAvatar",
  name: "WithAvatar",
};

export const CheckboxWithIcon = CheckboxTemplate.bind({});
CheckboxWithIcon.args = {
  children: <CheckboxWithIconChildren />,
  label: "Label",
  id: "CheckboxWithIcon",
  name: "WithIcon",
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 32px;
  line-height: 1em;
`;

const Text = styled.span`
  font-size: 14px;
`;

const IconWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 32px;
  height: 32px;
  background: #fde7f1;
  border-radius: 8px;
`;
