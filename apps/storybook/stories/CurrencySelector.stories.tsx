import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CurrencySelect } from "ui";

export default {
    title: "Currency Select",
    component: CurrencySelect,
} as ComponentMeta<typeof CurrencySelect>;

const CurrencySelectTemplate: ComponentStory<typeof CurrencySelect> = ({...args }) => (
    <CurrencySelect />
);

export const Select = CurrencySelectTemplate.bind({});
Select.args = {
};

export const SelectWithError = CurrencySelectTemplate.bind({});
SelectWithError.args = {
    hasError: true,
    hasSupportingLabel: true,
}
