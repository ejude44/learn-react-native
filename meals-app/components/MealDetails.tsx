import { Text, View, StyleSheet } from 'react-native';

interface Props {
  duration: number;
  complexity: string;
  affordability: string;
  style?: object;
  textStyle?: object;
}

function MealDetails({
  duration,
  complexity,
  affordability,
  style,
  textStyle,
}: Props) {
  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.detailsItem, textStyle]}>{duration}m</Text>
      <Text style={[styles.detailsItem, textStyle]}>{complexity}</Text>
      <Text style={[styles.detailsItem, textStyle]}>{affordability}</Text>
    </View>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailsItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
