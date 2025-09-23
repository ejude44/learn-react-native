import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../model/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import { ExpenseData, useExpenses } from '../providers/ExpenseContextProvider';
import { Expense } from '../model/expenses.model';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import IconButton from '../components/ui/IconButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

function ManageExpense({ route, navigation }: Props) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const { deleteExpense, updateExpense, expenses, addExpense } = useExpenses();

  const editedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId!);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: ExpenseData) {
    if (isEditing)
      updateExpense(editedExpenseId!, { ...expenseData, id: editedExpenseId! });
    else {
      const newExpense: Expense = {
        ...expenseData,
        id: Math.random().toString(),
      };
      addExpense(newExpense);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={editedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={'trash'}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
