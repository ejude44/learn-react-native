import { generateRandomBetween } from './generateRandomBetween';
import { Alert } from 'react-native';

export enum Direction {
  LOWER = 'lower',
  GREATER = 'greater',
}

export function nextGuess(
  direction: Direction,
  maxBoundary: number,
  currentGuess: number,
  minBoundary: number,
  userNumber: number
) {
  if (
    (direction === Direction.LOWER && currentGuess < userNumber) ||
    (direction === Direction.GREATER && currentGuess > userNumber)
  ) {
    Alert.alert("'Don't lie", 'You know that this is wrong...', [
      { text: 'Sorry!', style: 'cancel' },
    ]);
    return;
  }

  if (direction === Direction.LOWER) {
    maxBoundary = currentGuess;
  } else {
    minBoundary = currentGuess + 1;
  }
  return generateRandomBetween(minBoundary, maxBoundary, currentGuess);
}
