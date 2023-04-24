interface Currency {
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
interface Transaction {
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
  icon: string;
  startDate: number;
  endDate: number;
  limit: number;
  currency: Currency;
}

export interface BudgetTransaction {
  budgetID: string;
  transactions: Transaction[];
}
