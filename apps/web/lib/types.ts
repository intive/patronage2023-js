import { IconType } from "ui/Icon";
import { CategoryType } from "ui/CategoryIcon";

interface Icon {
  name: string;
  foreground: string;
  background: string;
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
  startDate: number;
  endDate: number;
  limit: number;
  currency: string;
  userID: string;
}

export interface BudgetTransaction {
  budgetID: string;
  transactions: Transaction[];
}

export interface CategoryMap {
  [category: string]: CategoryType | undefined;
}
