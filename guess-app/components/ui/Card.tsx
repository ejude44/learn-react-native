import { View, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import { ReactNode } from 'react';
import { useDimensions } from '../../utils/useDimensions';

interface Props {
  children: ReactNode;
}

function Card({ children }: Props) {
  return <View style={styles.cardContainer}>{children}</View>;
}

export default Card;

const { deviceWidth } = useDimensions();

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor: Colors.primary800,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
