import { CategoryMap } from "./types";
import { theme } from "ui/theme";

const { categoryIcons } = theme;

const categoryMap: CategoryMap = {
  HomeSpendings: {
    name: "Home spendings",
    icon: {
      name: "home",
      ...categoryIcons.homeSpendings,
    },
  },
  Subscriptions: {
    name: "Subscriptions",
    icon: {
      name: "subscriptions",
      ...categoryIcons.subscriptions,
    },
  },
  Car: {
    name: "Car",
    icon: {
      name: "directions_car",
      ...categoryIcons.car,
    },
  },
  Grocery: {
    name: "Grocery",
    icon: {
      name: "shopping_cart",
      ...categoryIcons.grocery,
    },
  },
};

export default categoryMap;
