export interface Budget {
  id: string;
  name: string;
  description: string;
  icon: string;
  startDate: number;
  endDate: number;
  limit: number;
  currency: {
    tag: string;
    locale: string;
  };
  transactions: {
    id: string;
    date: number;
    amount: number;
    category: {
      id: number;
      name: string;
      icon: {
        name: string;
        foreground: string;
        background: string;
      };
    };
    description: string;
    status: string;
    creator: {
      id: string;
      name: string;
      avatar: string;
    };
  }[];
}
