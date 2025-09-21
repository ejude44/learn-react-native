import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { useState } from 'react';

interface Props {
  addGoal: (enteredGoalText: string) => void;
  isVisible: boolean;
  closeModal: () => void;
}

function GoalInput({ addGoal, isVisible, closeModal }: Props) {
  const [enteredGoalText, setEnteredGoalText] = useState<string>('');

  function onTextInputHandler(enteredTest: string) {
    setEnteredGoalText(enteredTest);
  }

  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/goal.jpeg')} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          value={enteredGoalText}
          onChangeText={onTextInputHandler}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add Goal"
              onPress={() => {
                addGoal(enteredGoalText);
                setEnteredGoalText('');
              }}
              color={'#9469ca'}
            />
          </View>
          <View style={styles.button}>
            <Button title="close" onPress={closeModal} color={'#f31282'} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    backgroundColor: '#311b6b',
  },
  image: {
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    padding: 16,
    width: '100%',
    borderRadius: 8,
    color: '#120438',
    backgroundColor: '#e4d0ff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
