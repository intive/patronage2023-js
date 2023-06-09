import { theme } from "ui/theme";

const { categoryIcons } = theme;

//CategoryMap type removed since it's fixed object. We should get these data from BE.
//Since the name is set as a string to prevent errors I'll define that if string doesn't matches any part on this list it assigns HomeSpendings on default
const categoryMap = {
  HomeSpendings: {
    categoryId: "1",
    name: "Home spendings",
    icon: {
      iconName: "home",
      ...categoryIcons.homeSpendings,
    },
  },
  Subscriptions: {
    categoryId: "2",
    name: "Subscriptions",
    icon: {
      iconName: "subscriptions",
      ...categoryIcons.subscriptions,
    },
  },
  Car: {
    categoryId: "3",
    name: "Car",
    icon: {
      iconName: "directions_car",
      ...categoryIcons.car,
    },
  },
  Grocery: {
    categoryId: "4",
    name: "Grocery",
    icon: {
      iconName: "shopping_cart",
      ...categoryIcons.grocery,
    },
  },
  Salary: {
    categoryId: "5",
    name: "Salary",
    icon: {
      iconName: "payments",
      ...categoryIcons.salary,
    },
  },
  Refund: {
    categoryId: "6",
    name: "Refund",
    icon: {
      iconName: "currency_exchange",
      ...categoryIcons.refund,
    },
  },
};

export type CategoryMapType = typeof categoryMap;

export default categoryMap;
