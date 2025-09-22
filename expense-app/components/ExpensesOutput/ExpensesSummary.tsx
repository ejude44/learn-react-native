import { Text, View } from 'react-native';
import { Expense } from '../../model/expenses.model';

interface Props {
  periodName: string;
  expenses: Expense[];
}

function ExpensesSummary({ periodName, expenses }: Props) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
