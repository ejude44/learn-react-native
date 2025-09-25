import { FlatList, ListRenderItemInfo } from 'react-native';
import { Expense } from '../../model/expenses.model';
import ExpenseItem from './ExpenseItem';

interface Props {
  expenses: Expense[];
}

function renderExpenseItem(itemData: ListRenderItemInfo<Expense>) {
  return (
    <ExpenseItem
      id={itemData.item.id}
      description={itemData.item.description}
      amount={itemData.item.amount}
      date={itemData.item.date}
      receiptImage={itemData.item.receiptImage}
      locationName={itemData.item.locationName}
    />
  );
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
