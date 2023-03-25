import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ErrorMessage } from "ui";

export default {
  title: "Error message",
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = ({ ...args }) => (
  <ErrorMessage {...args} />
);

export const ErrorWithShortMessage = Template.bind({});
ErrorWithShortMessage.args = {
  message: "Invalid credentials. Please try again.",
};

export const ErrorWithLongMessage = Template.bind({});
ErrorWithLongMessage.args = {
  message:
    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita iusto reiciendis exercitationem praesentium debitis eum enim pariatur quam, omnis dolor at ad, autem blanditiis voluptas distinctio accusamus harum. Corporis, exercitationem. Eos accusantium aperiam esse. A non modi tempora quod vero tempore nihil, assumenda sed officia quas vitae exercitationem maiores alias. Veniam fugiat voluptate nobis asperiores consectetur tempora consequatur dicta incidunt. ",
};
