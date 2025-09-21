import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import TitleAndroid from '../components/ui/Title.android';
import { useEffect, useMemo, useState } from 'react';
import { generateRandomBetween } from '../utils/generateRandomBetween';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Direction, nextGuess } from '../utils/nextGuess';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

interface Props {
  enteredNumber: number;
  onGameOver: () => void;
  onSetRounds: (rounds: number) => void;
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ enteredNumber, onGameOver, onSetRounds }: Props) {
  const initialGuess = useMemo(
    () => generateRandomBetween(1, 100, enteredNumber),
    []
  );

  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === enteredNumber) {
      onSetRounds(guessRounds.length);
      onGameOver();
    }
  }, [currentGuess, enteredNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function performGuess(direction: Direction) {
    const nextGuessednumber = nextGuess(
      direction,
      maxBoundary,
      currentGuess,
      minBoundary,
      enteredNumber
    );
    if (!nextGuessednumber) return;
    setCurrentGuess(nextGuessednumber);
    setGuessRounds((prev) => [nextGuessednumber, ...prev]);
  }

  let content = (
    <>
      <NumberContainer number={currentGuess} />
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => performGuess(Direction.GREATER)}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => performGuess(Direction.LOWER)}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => performGuess(Direction.GREATER)}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer number={currentGuess} />
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => performGuess(Direction.LOWER)}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleAndroid>Opponent's Guess</TitleAndroid>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(guess) => (
            <GuessLogItem
              guess={guess.item}
              roundNumber={guessRounds.length - guess.index}
            />
          )}
          keyExtractor={(item) => item.toString() + Math.random().toString()}
        ></FlatList>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
