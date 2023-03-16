import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LinkComponent } from "ui";

export default {
    title: "Link",
    component: LinkComponent,
} as ComponentMeta<typeof LinkComponent>;

const Template: ComponentStory<typeof LinkComponent> = (href, onClick) => (
    <Link href={href} onClick={function(){}}>Log In</Link>
);

export const Link = Template.bind({});
Link.args = {
    children: "Log In",
};
