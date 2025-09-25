import { request } from './request';
import { ExpenseData } from '../model/expenses.model';
import * as SecureStore from 'expo-secure-store';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await SecureStore.getItemAsync('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function storeExpense(expense: ExpenseData) {
  try {
    const authHeaders = await getAuthHeaders();

    const response = await request('store', {
      method: 'POST',
      body: JSON.stringify({
        amount: expense.amount,
        date: expense.date.toISOString(),
        description: expense.description,
        receiptImage: expense.receiptImage,
        latitude: expense.latitude,
        longitude: expense.longitude,
        locationName: expense.locationName,
      }),
      headers: {
        ...authHeaders,
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
    const authHeaders = await getAuthHeaders();

    const response = await request('expenses', {
      headers: authHeaders,
    });

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
    const authHeaders = await getAuthHeaders();

    const response = await request(`expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        amount: expense.amount,
        date: expense.date.toISOString(),
        description: expense.description,
        receiptImage: expense.receiptImage,
        latitude: expense.latitude,
        longitude: expense.longitude,
        locationName: expense.locationName,
      }),
      headers: {
        ...authHeaders,
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
    const authHeaders = await getAuthHeaders();

    const response = await request(`expenses/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
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
