import { ImageBackground, StatusBar, StyleSheet, Text } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Colors from './utils/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
//import * as SplashScreen from 'expo-splash-screen';

//SplashScreen.setOptions({ duration: 1000, fade: true });
// 'Splashscreen.setOptions' cannot be used in Expo Go. To customize the splash screen, you can use development builds.
//SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>();
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);
  const [restart, setRestart] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(0);

  const [isFontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!isFontLoaded) return <Text children={'hmmm'} />;

  function pickedNumberHandler(pickedNumber: number) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  function restartGameHandler() {
    setUserNumber(null);
    setGameIsOver(true);
    setRounds(0);
    setRestart(true);
  }

  function setRoundsHandler(rounds: number) {
    setRounds(rounds);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen
        enteredNumber={userNumber}
        onGameOver={gameOverHandler}
        onSetRounds={setRoundsHandler}
      />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        onRestart={restartGameHandler}
        userNumber={userNumber}
        roundsNumber={rounds}
      />
    );
  }
  if (restart) {
    screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
    setRestart(false);
  }
  return (
    <>
      <StatusBar barStyle={'default'} />
      <SafeAreaProvider>
        <LinearGradient
          colors={[Colors.primary700, Colors.accent500]}
          style={styles.rootScreen}
        >
          <ImageBackground
            source={require('./assets/background.png')}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={{ opacity: 0.15 }}
          >
            <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
          </ImageBackground>
        </LinearGradient>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
