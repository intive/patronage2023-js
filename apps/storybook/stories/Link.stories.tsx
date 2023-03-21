import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkComponent } from "ui";

export default {
    title: "Link",
    component: LinkComponent,
    parameters: {
        actions: {
          handles: ['click'],
        },
    }
} as ComponentMeta<typeof LinkComponent>;

const LinkTemplate: ComponentStory<typeof LinkComponent> = ({children, ...args }) => (
    <LinkComponent {...args}>{children}</LinkComponent>
);

export const LogIn = LinkTemplate.bind({});
LogIn.args = {
    href: "/login",
    children: "Log In",
};

export const SignUp = LinkTemplate.bind({});
SignUp.args = {
    href: "/signup",
    children: "Sign Up",
};

const ButtonTemplate: ComponentStory<typeof LinkComponent> = ({children, ...args }) => (
    <LinkComponent {...args}>{children}</LinkComponent>
);

export const Manage = ButtonTemplate.bind({});
Manage.args = {
    children: "Manage",
    onClick: {
        action: 'clicked',
    },
};
