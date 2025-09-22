import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '../providers/ExpenseContextProvider';

function RecentExpenses() {
  const { expenses } = useExpenses();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return expense.date >= date7DaysAgo;
  });

  return (
    <ExpensesOutput
      fallbackText={'No Registered Expenses'}
      expenses={recentExpenses}
      expensesPeriod={'last 7 days'}
    />
  );
}

export default RecentExpenses;
