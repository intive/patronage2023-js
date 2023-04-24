import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CurrencyAmount } from "ui";

export default {
  title: "CurrencyAmount",
  component: CurrencyAmount,
  argTypes: {
    amount: { control: "number" },
  },
} as ComponentMeta<typeof CurrencyAmount>;

const Template: ComponentStory<typeof CurrencyAmount> = ({ ...args }) => (
  <CurrencyAmount {...args} />
);

export const PositiveAmountUSD_DE = Template.bind({});
PositiveAmountUSD_DE.args = {
  amount: 8600,
  currencyOptions: {
    ISO: "USD",
    locale: "de-DE",
  },
};

export const NegativeAmountUSD_US = Template.bind({});
NegativeAmountUSD_US.args = {
  amount: -8600,
  currencyOptions: {
    ISO: "USD",
    locale: "en-US",
  },
};

export const PositiveAmountUSD_US = Template.bind({});
PositiveAmountUSD_US.args = {
  amount: 860000000,
  currencyOptions: {
    ISO: "USD",
    locale: "en-US",
  },
};

export const PositiveAmountPLN_PL = Template.bind({});
PositiveAmountPLN_PL.args = {
  amount: 8600,
  currencyOptions: {
    ISO: "PLN",
    locale: "pl-PL",
  },
};

export const NegativeAmountPLN_PL = Template.bind({});
NegativeAmountPLN_PL.args = {
  amount: -8600,
  currencyOptions: {
    ISO: "PLN",
    locale: "pl-PL",
  },
};
