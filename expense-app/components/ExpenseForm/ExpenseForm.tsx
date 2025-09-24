import { View, StyleSheet, Text } from 'react-native';
import Input from '../Input/Input';
import { useState } from 'react';
import Button from '../ui/Button';
import { validateInput } from '../../utils/validateInput';
import { isDefined } from '../../utils/isDefined';
import { GlobalStyles } from '../../constants/styles';
import { ExpenseData } from '../../model/expenses.model';
import { formatDateToInput } from '../../utils/formatDateToInput';

interface InputValue {
  amount: string;
  date: string;
  description: string;
}

interface Props {
  onCancel: () => void;
  submitButtonLabel: string;
  onSubmit: (_expense: ExpenseData) => void;
  defaultValues?: ExpenseData;
}

function ExpenseForm({
  onCancel,
  submitButtonLabel,
  onSubmit,
  defaultValues,
}: Props) {
  const [inputValue, setInputValue] = useState<InputValue>({
    amount: isDefined(defaultValues) ? defaultValues.amount.toString() : '',
    date: isDefined(defaultValues) ? formatDateToInput(defaultValues.date) : '',
    description: isDefined(defaultValues) ? defaultValues.description : '',
  });

  const [formError, setFormError] = useState<string>('');

  function inputChangedHandler(
    inputIdentifier: keyof InputValue,
    enteredValue: string
  ) {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    const { isValid, error } = validateInput(expenseData);

    if (isValid && expenseData) {
      onSubmit(expenseData);
      setFormError('');
    } else {
      setFormError(error);
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          keyBoardType={'decimal-pad'}
          textInputConfig={{
            onChangeText: (value: string) =>
              inputChangedHandler('amount', value),
            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          keyBoardType={'default'}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value: string) => inputChangedHandler('date', value),
            value: inputValue.date,
          }}
        />
      </View>

      <Input
        label={'Description'}
        keyBoardType={'default'}
        textInputConfig={{
          multiline: true,
          numberOfLines: 4,
          autoCorrect: false,
          autoCapitalize: 'sentences',
          onChangeText: (value: string) =>
            inputChangedHandler('description', value),
          value: inputValue.description,
        }}
      />

      <View style={styles.buttons}>
        <Button mode={'flat'} onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>

      {<Text style={styles.errorText}>{formError}</Text>}
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    textAlign: 'center',
  },
});
