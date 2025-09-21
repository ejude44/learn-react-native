import { Text, View, StyleSheet } from 'react-native';

interface Props {
  subTitle: string;
}

function Subtitle({ subTitle }: Props) {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subTitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleContainer: {
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2,
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
  },
});
