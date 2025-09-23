import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface Props {
  label: string;
  keyBoardType: KeyboardTypeOptions;
  textInputConfig?: TextInputProps;
  style?: object;
}

function Input({ label, keyBoardType, textInputConfig, style }: Props) {
  const inputStyles = textInputConfig?.multiline
    ? [styles.input, styles.inputMultiline]
    : styles.input;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={inputStyles}
        keyboardType={keyBoardType}
        {...textInputConfig}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.primary100,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  label: {
    marginBottom: 5,
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    overflow: 'hidden',
  },
});
