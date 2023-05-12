import { Budget } from "./types";

export const FixCurrencyObject = (budget: Budget) => {
  const localObj = {
    USD: "en-US",
    GBP: "en-GB",
    EUR: "de-DE",
    PLN: "pl-PL",
  };

  return {
    ...budget,
    currency: {
      tag: budget.currency,
      locale: localObj[budget.currency as keyof typeof localObj],
    },
  };
};
