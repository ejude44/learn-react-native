import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/colors';
import { useDimensions } from '../../utils/useDimensions';

interface Props {
  number: number;
}

function NumberContainer({ number }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  );
}

export default NumberContainer;

const { deviceWidth } = useDimensions();

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    margin: deviceWidth < 380 ? 12 : 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontFamily: 'open-sans-bold',
    color: Colors.accent500,
    textAlign: 'center',
  },
});
