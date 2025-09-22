import { FlatList, ListRenderItemInfo, Text } from 'react-native';
import { Expense } from '../../model/expenses.model';

interface Props {
  expenses: Expense[];
}

function renderExpenseItem(itemData: ListRenderItemInfo<Expense>) {
  return <Text>{itemData.item.description}</Text>;
}

function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={expenses}
      renderItem={(itemData) => renderExpenseItem(itemData)}
    />
  );
}

export default ExpensesList;
