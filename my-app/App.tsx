import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export interface CourseGoal {
  id: string;
  text: string;
}

export default function App() {
  const [courseGoals, setCourseGoals] = useState<CourseGoal[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function addGoal(enteredGoalText: string) {
    if (enteredGoalText.length === 0) return;
    setCourseGoals((currentCourseGoals: CourseGoal[]) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setOpenModal(false);
  }

  function removeGoal(id: string) {
    setCourseGoals((prev) => prev.filter((goal: CourseGoal) => goal.id !== id));
  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <>
      <StatusBar style={'light'} />
      <View style={styles.appContainer}>
        <Button
          title={'Add New Goal'}
          color={'#7fa9cc'}
          onPress={() => setOpenModal((prev) => !prev)}
        />

        <GoalInput
          addGoal={addGoal}
          isVisible={openModal}
          closeModal={closeModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(goalItem) => (
              <GoalItem goal={goalItem} removeGoal={removeGoal} />
            )}
            keyExtractor={(item: CourseGoal) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 5,
    marginTop: 6,
  },
});
