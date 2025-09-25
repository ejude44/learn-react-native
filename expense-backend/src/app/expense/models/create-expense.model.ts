export interface CreateExpenseDto {
  amount: number;
  date: string;
  description: string;
  receiptImage?: string;
}
