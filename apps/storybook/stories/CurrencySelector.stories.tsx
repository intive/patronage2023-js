import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CurrencySelector } from "ui";

export default {
    title: "Currency Selector",
    component: CurrencySelector,
} as ComponentMeta<typeof CurrencySelector>;

const CurrencySelectorTemplate: ComponentStory<typeof CurrencySelector> = ({...args }) => (
    <CurrencySelector />
);

export const Selector = CurrencySelectorTemplate.bind({});
Selector.args = {
};
