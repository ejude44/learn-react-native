import { ExpenseData } from '../providers/ExpenseContextProvider';

export function validateInput(formInput: ExpenseData): {
  isValid: boolean;
  error: string;
} {
  const { amount, date, description } = formInput;

  const isValidAmount = !isNaN(amount) && amount > 0;
  const isValidDate = new Date(date).toString() !== 'Invalid Date';
  const isValidDescription = description.trim().length > 0;

  if (!isValidAmount) {
    return { isValid: false, error: 'Amount must be a valid positive number' };
  }

  if (!isValidDate) {
    return { isValid: false, error: 'Date must be a valid date' };
  }

  if (!isValidDescription) {
    return { isValid: false, error: 'Description cannot be empty' };
  }

  return { isValid: true, error: '' };
}
