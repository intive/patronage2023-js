import { Budget } from "./types";

export const FixCurrencyObject = (budget: Budget) => {
  const strToLocale = (tag: string) => {
    const localObj = {
      USD: "en-US",
      GBP: "en-GB",
      EUR: "de-DE",
      PLN: "pl-PL",
    };
    return {
      tag,
      locale: localObj[tag as keyof typeof localObj],
    };
  };
  return {
    ...budget,
    currency: strToLocale(budget.currency),
  };
};
