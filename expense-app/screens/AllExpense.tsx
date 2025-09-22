import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '../providers/ExpenseContextProvider';

function AllExpense() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      fallbackText={'No expenses'}
      expenses={expenses}
      expensesPeriod={'total'}
    />
  );
}

export default AllExpense;
