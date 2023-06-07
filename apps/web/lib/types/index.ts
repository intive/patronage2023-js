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

export interface BudgetUser {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  userEmail: string;
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
  userId: string;
  budgetUsers: BudgetUser[];
  isFavourite: boolean;
}

export interface BudgetFixed {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  startDate: string;
  endDate: string;
  limit: number;
  userId: string;
  budgetUsers: BudgetUser[];
  currency: {
    tag: string;
    locale: string;
  };
  isFavourite: boolean;
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

export interface UserRole {
  role: "ADMIN" | "USER";
}
