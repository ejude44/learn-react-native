import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Expense } from '../model/expenses.model';
import { fetchExpenses } from '../utils/http';
import { useAuth } from './AuthContextProvider';

type ExpenseAction =
  | { type: 'SET'; payload: Expense[] }
  | { type: 'ADD'; payload: Expense }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE'; payload: { id: string; expense: Expense } };

interface ExpenseContextValue {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Expense) => void;
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextValue | null>(null);

export const useExpenses = (): ExpenseContextValue => {
  const contest = useContext(ExpenseContext);
  if (!contest) {
    throw new Error(
      'useExpenses must be used within an ExpenseContextProvider'
    );
  }
  return contest;
};

interface ExpenseProviderProps {
  children: ReactNode;
}

function expensesReducer(state: Expense[], action: ExpenseAction): Expense[] {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload.expense : expense
      );
    default:
      return state;
  }
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();

  async function fetchExpenseFromBackend() {
    try {
      setIsLoading(true);
      await fetchExpenses().then((expenses) => {
        dispatch({ type: 'SET', payload: expenses });
      });
    } catch (e) {
      setError(`Something went wrong fetching the expenses: ${e}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'SET', payload: [] });
      return;
    }
    fetchExpenseFromBackend();
  }, [user]);

  const value = useMemo(
    () => ({
      expenses: expensesState,
      addExpense: (expense: Expense) =>
        dispatch({ type: 'ADD', payload: expense }),
      deleteExpense: (id: string) => dispatch({ type: 'DELETE', payload: id }),
      updateExpense: (id: string, expense: Expense) =>
        dispatch({
          type: 'UPDATE',
          payload: { id, expense },
        }),
      isLoading,
      error,
      setError,
    }),
    [expensesState, error, isLoading]
  );
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
