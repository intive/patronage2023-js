import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Textarea } from "ui";
import styled from "styled-components";

export default {
  title: "Textarea",
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

//creating imitation of parent component for proper display on Storybook
const TextAreaWrapper = styled.div`
  height: 300px;
  width: 400px;
`;

const Template: ComponentStory<typeof Textarea> = () => (
  <TextAreaWrapper>
    <Textarea />
  </TextAreaWrapper>
);

export const Simple = Template.bind({});
