import { View, StyleSheet, Alert, Text } from 'react-native';
import { RootStackParamList } from '../model/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import { useExpenses } from '../providers/ExpenseContextProvider';
import { Expense, ExpenseData } from '../model/expenses.model';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import IconButton from '../components/ui/IconButton';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

function ManageExpense({ route, navigation }: Props) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const {
    deleteExpense: deleteExpenseContext,
    expenses,
    addExpense,
    updateExpense: updateExpenseContext,
  } = useExpenses();

  const editedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      setIsLoading(true);
      await deleteExpense(editedExpenseId!);
      deleteExpenseContext(editedExpenseId!);
    } catch (e) {
      Alert.alert(`Failed to delete expense. Please try again.${e}`);
      return;
    } finally {
      setIsLoading(false);
    }
    if (!isLoading) navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function addExpenses(expenseData: ExpenseData) {
    try {
      setIsLoading(true);
      const result = await storeExpense(expenseData);
      addExpense(result);
    } catch (e) {
      Alert.alert(`Failed to save expense. Please try again.${e}`);
      throw e;
    } finally {
      if (!isLoading) setIsLoading(false);
    }
  }

  async function updateExpenses(expenseData: ExpenseData) {
    try {
      setIsLoading(true);
      await updateExpense(editedExpenseId!, expenseData);
      const fullExpense: Expense = {
        ...expenseData,
        id: editedExpenseId!,
        createdAt: editedExpense!.createdAt,
        updatedAt: new Date(),
      };
      updateExpenseContext(editedExpenseId!, fullExpense);
    } catch (e) {
      Alert.alert(`Failed to update expense. Please try again.${e}`);
      return;
    } finally {
      if (!isLoading) setIsLoading(false);
    }
  }

  async function confirmHandler(expenseData: ExpenseData) {
    if (isEditing) {
      await updateExpenses(expenseData);
    } else {
      await addExpenses(expenseData);
    }
    navigation.goBack();
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
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
