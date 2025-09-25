export interface CreateExpenseDto {
  amount: number;
  date: string;
  description: string;
  receiptImage?: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
}
