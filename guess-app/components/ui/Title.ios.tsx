import { Text, StyleSheet, Platform } from 'react-native';
import { ReactNode } from 'react';

export default function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    padding: 12,
    //borderWidth: Platform.OS === 'android' ? 2 : 0,
    //borderWidth: Platform.select({ ios: 0, android: 2 }),
    //borderColor: 'white',
    //borderRadius: 12,
    maxWidth: '80%',
    width: 300,
  },
});
