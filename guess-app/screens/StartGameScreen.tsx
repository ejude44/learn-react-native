import {
  TextInput,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import { validateAndResetInputField } from '../utils/validateAndResetInputField';
import Colors from '../utils/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import ScrollView = Animated.ScrollView;
import Title from '../components/ui/Title';

interface Props {
  onPickNumber: (pickedNumber: number) => void;
}

function StartGameScreen({ onPickNumber }: Props) {
  const [enteredNumber, setEnteredNumber] = useState<string>('');
  const { height } = useWindowDimensions();

  function numberInputHandler(enteredText: string) {
    setEnteredNumber(enteredText);
  }

  function resetInput() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    validateAndResetInputField(enteredNumber, resetInput);
    onPickNumber(parseInt(enteredNumber));
  }

  const marginTopDistance = height < 394 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior={'position'}>
        <View style={[styles.root, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType={'number-pad'}
              autoCapitalize={'none'}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={resetInput}
                  icon={
                    <Image
                      style={styles.icon}
                      source={require('../assets/reset.jpeg')}
                    />
                  }
                >
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={confirmInputHandler}
                  icon={
                    <Image
                      style={styles.icon}
                      resizeMode="contain"
                      source={require('../assets/confirm-green.jpg')}
                    />
                  }
                >
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

//const { deviceHeight } = useDimensions();

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  root: {
    flex: 1,
    //marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
