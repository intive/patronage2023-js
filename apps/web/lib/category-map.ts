import { theme } from "ui/theme";
import { useTranslate } from "./hooks";

const { categoryIcons } = theme;

//CategoryMap type removed since it's fixed object. We should get these data from BE.
//Since the name is set as a string to prevent errors I'll define that if string doesn't matches any part on this list it assigns HomeSpendings on default
const categoryMap = {
  HomeSpendings: {
    id: 1,
    name: "Home spendings",
    icon: {
      name: "home",
      ...categoryIcons.homeSpendings,
    },
  },
  Subscriptions: {
    id: 2,
    name: "Subscriptions",
    icon: {
      name: "subscriptions",
      ...categoryIcons.subscriptions,
    },
  },
  Car: {
    id: 3,
    name: "Car",
    icon: {
      name: "directions_car",
      ...categoryIcons.car,
    },
  },
  Grocery: {
    id: 4,
    name: "Grocery",
    icon: {
      name: "shopping_cart",
      ...categoryIcons.grocery,
    },
  },
};

export const useCategoryMap = () => {
  const { t, dict } = useTranslate("CategoryMap");

  const { HomeSpendings, Subscriptions, Car, Grocery } = categoryMap;

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
  };
  return { ...translatedCategoryMap };
};

export type CategoryMapType = typeof categoryMap;

export default categoryMap;
