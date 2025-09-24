import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '../providers/ExpenseContextProvider';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function RecentExpenses() {
  const { expenses, isLoading } = useExpenses();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    const expenseDate = new Date(expense.date);
    return expenseDate >= date7DaysAgo;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      fallbackText={'No Registered Expenses'}
      expenses={recentExpenses}
      expensesPeriod={'last 7 days'}
    />
  );
}

export default RecentExpenses;
