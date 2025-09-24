import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../model/navigation';
import { formatDateShort } from '../../utils/formatDateShort';

interface Props {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function ExpenseItem({ description, amount, date, id }: Props) {
  const navigation = useNavigation<NavigationProp>();
  function pressHandler() {
    navigation.navigate('ManageExpense', { expenseId: id });
  }
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{formatDateShort(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: GlobalStyles.colors.primary500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
