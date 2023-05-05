import { CategoryMap } from "./types";
import { theme } from "ui/theme";

const categoryMap: CategoryMap = {
  HomeSpendings: {
    name: "Home spendings",
    icon: {
      name: "home",
      foreground: theme.categoryIcons.homeSpendings.foreground,
      background: theme.categoryIcons.homeSpendings.background,
    },
  },
  Subscriptions: {
    name: "Subscriptions",
    icon: {
      name: "subscriptions",
      foreground: theme.categoryIcons.subscriptions.foreground,
      background: theme.categoryIcons.subscriptions.background,
    },
  },
  Car: {
    name: "Car",
    icon: {
      name: "directions_car",
      foreground: theme.categoryIcons.car.foreground,
      background: theme.categoryIcons.car.background,
    },
  },
  Grocery: {
    name: "Grocery",
    icon: {
      name: "shopping_cart",
      foreground: theme.categoryIcons.grocery.foreground,
      background: theme.categoryIcons.grocery.background,
    },
  },
};

export default categoryMap;
