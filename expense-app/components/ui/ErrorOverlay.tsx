import { View, StyleSheet, Text, Button } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface Props {
  message: string;
}

function ErrorOverlay({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button title="Okay" />
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
