import categoryMap from "lib/category-map";
import { useTranslate } from "./useTranslate";

export const useCategoryMap = () => {
  const { t, dict } = useTranslate("CategoryMap");

  const { HomeSpendings, Subscriptions, Car, Grocery, Salary, Refund } =
    categoryMap;

  const translatedCategoryMap = {
    HomeSpendings: {
      ...HomeSpendings,
      name: t(dict.homeSpendings),
    },
    Subscriptions: {
      ...Subscriptions,
      name: t(dict.subscriptions),
    },
    Car: {
      ...Car,
      name: t(dict.car),
    },
    Grocery: {
      ...Grocery,
      name: t(dict.grocery),
    },
    Salary: {
      ...Salary,
      name: t(dict.salary),
    },
    Refund: {
      ...Refund,
      name: t(dict.refund),
    },
  };
  return { ...translatedCategoryMap };
};
