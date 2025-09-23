import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Expense } from '../model/expenses.model';
import { DUMMY_EXPENSES } from '../Data';

type ExpenseAction =
  | { type: 'ADD'; payload: ExpenseData }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE'; payload: { id: string; expense: Expense } };

export type ExpenseData = Omit<Expense, 'id'>;

interface ExpenseContextValue {
  expenses: Expense[];
  addExpense: (expense: ExpenseData) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (_id: string, expense: Expense) => void;
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
    case 'ADD':
      return [
        ...state,
        {
          ...action.payload,
          id: new Date().toString() + Math.random().toString(),
        },
      ];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const value = useMemo(
    () => ({
      expenses: expensesState,
      addExpense: (expense: ExpenseData) =>
        dispatch({ type: 'ADD', payload: expense }),
      deleteExpense: (id: string) => dispatch({ type: 'DELETE', payload: id }),
      updateExpense: (id: string, expense: Expense) =>
        dispatch({
          type: 'UPDATE',
          payload: { id, expense },
        }),
    }),
    [expensesState]
  );
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
