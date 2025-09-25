import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthContextProvider';
import Button from '../components/ui/Button';
import { GlobalStyles } from '../constants/styles';

function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      Alert.alert(`Error', 'Invalid credentials ${error}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={GlobalStyles.colors.primary100}
      />

      <Button onPress={handleLogin}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>

      <Button mode="flat" onPress={() => navigation.navigate('Signup')}>
        Don &apos;t have an account? Sign up
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

export default LoginScreen;
