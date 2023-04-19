export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: {
    ISO: string;
    locale: string;
  };
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
  creator: string;
}
