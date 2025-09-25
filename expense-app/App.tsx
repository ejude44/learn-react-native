import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpense from './screens/AllExpense';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IconButton from './components/ui/IconButton';
import { RootStackParamList, RootTabParamList } from './model/navigation';
import { ExpenseProvider } from './providers/ExpenseContextProvider';
import { AuthProvider, useAuth } from './providers/AuthContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { View } from 'react-native';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootTabParamList>();
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function ExpensesOverview() {
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() =>
                  navigation.navigate('ManageExpense', { expenseId: undefined })
                }
              />
              <IconButton
                icon="log-out"
                size={24}
                color={tintColor}
                onPress={logout}
              />
            </View>
          );
        },
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpense}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="calendar" size={size} color={color} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <ErrorBoundary>
          <AuthProvider>
            <ExpenseProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </ExpenseProvider>
          </AuthProvider>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
}
