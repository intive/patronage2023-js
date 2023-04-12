import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Textarea } from "ui";
import styled from "styled-components";

export default {
  title: "Textarea",
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

//creating imitation of parent component for proper display on Storybook
const TextareaWrapper = styled.div`
  height: 300px;
  width: 400px;
`;

const Template: ComponentStory<typeof Textarea> = ({ ...args }) => (
  <TextareaWrapper>
    <Textarea {...args} />
  </TextareaWrapper>
);

export const Simple = Template.bind({});
Simple.args = {
  label: "Description",
};
