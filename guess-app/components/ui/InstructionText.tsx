import { Text, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: object;
}

function InstructionText({ children, style }: Props) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
    marginBottom: 8,
  },
});
