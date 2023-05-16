import { atom } from "jotai";
import { CategoryFilterType } from "lib/types";

const initCategoryFilterState: CategoryFilterType = {
  HomeSpendings: false,
  Subscriptions: false,
  Car: false,
  Grocery: false,
};

export const categoryFilterAtom = atom<CategoryFilterType>(
  initCategoryFilterState
);
