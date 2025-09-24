export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ExpenseData = Omit<Expense, 'id' | 'updatedAt' | 'createdAt'>;
