import { request } from './request';
import { ExpenseData } from '../model/expenses.model';

export async function storeExpense(expense: ExpenseData) {
  try {
    const response = await request('api/store', {
      method: 'POST',
      body: JSON.stringify({
        amount: expense.amount,
        date: expense.date.toISOString(),
        description: expense.description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to store expense: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing expense:', error);
    throw error;
  }
}

export async function fetchExpenses() {
  try {
    const response = await request('api/expenses');

    if (!response.ok) {
      throw new Error(`Failed to fetch expenses: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
}

export async function updateExpense(id: string, expense: ExpenseData) {
  try {
    const response = await request(`api/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        amount: expense.amount,
        date: expense.date.toISOString(),
        description: expense.description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update expense: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
}

export async function deleteExpense(id: string) {
  try {
    const response = await request(`api/expenses/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete expense: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
}
