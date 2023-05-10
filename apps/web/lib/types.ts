import { IconType } from "ui/Icon";
import { CategoryType } from "ui/CategoryIcon";

export interface Currency {
  tag: string;
  locale: string;
}
interface Icon {
  name: string;
  foreground: string;
  background: string;
}
interface Category {
  id: number;
  name: string;
  icon: Icon;
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
  category: Category;
  description: string;
  status: string;
  creator: Creator;
}

export interface Budget {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  startDate: number;
  endDate: number;
  limit: number;
  currency: Currency;
}

export interface BudgetTransaction {
  budgetID: string;
  transactions: Transaction[];
}

export interface CategoryMap {
  [category: string]: CategoryType | undefined;
}
export interface BudgetStatistics {
  statistics: {
    items: Array<{
      value: number;
      datePoint: string;
    }>;
    trendValue: number;
    totalBudgetValue: number;
  };
  currency: string;
}
