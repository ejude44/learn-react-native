import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { loginUser, registerUser } from '../utils/auth-http';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const storedToken = await SecureStore.getItemAsync('token');
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);

      await SecureStore.setItemAsync('token', data.access_token);
      await SecureStore.setItemAsync('user', JSON.stringify(data.user));

      setToken(data.access_token);
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function signup(email: string, password: string) {
    setIsLoading(true);
    try {
      const data = await registerUser(email, password);

      await SecureStore.setItemAsync('token', data.access_token);
      await SecureStore.setItemAsync('user', JSON.stringify(data.user));

      setToken(data.access_token);
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
