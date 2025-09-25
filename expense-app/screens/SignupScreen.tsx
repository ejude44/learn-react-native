import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthContextProvider';
import Button from '../components/ui/Button';
import { GlobalStyles } from '../constants/styles';

function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading } = useAuth();

  async function handleSignup() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await signup(email, password);
    } catch (error) {
      Alert.alert(`Error', 'Signup failed ${error}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={GlobalStyles.colors.primary100}
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={GlobalStyles.colors.primary100}
      />

      <Button onPress={handleSignup}>
        {isLoading ? 'Loading...' : 'Sign Up'}
      </Button>

      <Button mode="flat" onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.primary800,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary200,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
  },
});

export default SignupScreen;
