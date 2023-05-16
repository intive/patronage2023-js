import { IconType } from "ui/Icon";
import { CategoryType } from "ui/CategoryIcon";

export interface Currency {
  tag: string;
  locale: string;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  date: number;
  amount: number;
  category: CategoryType;
  description: string;
  status: string;
  creator: Creator;
}

export interface Budget {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  startDate: string;
  endDate: string;
  limit: number;
  currency: string;
  userID: string;
}

export interface BudgetFixed {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  startDate: string;
  endDate: string;
  limit: number;
  userID: string;
  currency: {
    tag: string;
    locale: string;
  };
}

export interface BudgetGeneralInfo {
  id: string;
  currency: {
    tag: string;
    locale: string;
  };
  startDate: string;
  endDate: string;
}

export interface BudgetTransaction {
  budgetID: string;
  transactions: Transaction[];
}

export interface CategoryMap {
  [category: string]: CategoryType | undefined;
}
