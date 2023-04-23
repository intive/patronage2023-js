import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThreeDots } from "ui";
import styled from "styled-components";

export default {
  title: "ThreeDots",
  component: ThreeDots,
} as ComponentMeta<typeof ThreeDots>;

//ThreeDots components accepts `items` as prop in order to be more generic - it can be used in diffrent places with diffrent items.
const dummyItems = ["Edit", "Remove", "Clone"];

//creating a wrapper for proper display on Storybook
const ThreeDotsWrapper = styled.div`
  margin: 30px;
`;

const Template: ComponentStory<typeof ThreeDots> = ({ ...args }) => (
  <ThreeDotsWrapper>
    <ThreeDots {...args} />
  </ThreeDotsWrapper>
);

export const Simple = Template.bind({});
Simple.args = {
  items: dummyItems,
};
