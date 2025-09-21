import { Alert } from 'react-native';

export function validateAndResetInputField(
  enteredNumber: string,
  resetField: () => void = () => {}
) {
  if (!enteredNumber) return;
  const number = parseInt(enteredNumber);
  if (isNaN(number) || number <= 0 || number > 99) {
    Alert.alert(
      'Invalid Number',
      'Number has to be a number between 1 and 99.',
      [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: resetField,
        },
      ]
    );
    return;
  }
}
