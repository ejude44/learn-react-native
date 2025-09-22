import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function RecentExpenses() {
  return <ExpensesOutput expensesPeriod={'last 7 days'} />;
}

export default RecentExpenses;
