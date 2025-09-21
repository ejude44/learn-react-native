import {
  ListRenderItemInfo,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { CourseGoal } from '../App';

interface Props {
  goal: ListRenderItemInfo<CourseGoal>;
  removeGoal: (id: string) => void;
}

function GoalItem({ goal, removeGoal }: Props) {
  return (
    <Pressable
      android_ripple={{ color: 'dd9d57' }}
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => removeGoal(goal.item.id)}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{goal.item.text}</Text>
      </View>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressedItem: {
    opacity: 0.5,
  },
});
