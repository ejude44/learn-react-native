import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  //const Drawer = createDrawerNavigator();

  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3c0a6b' },
          headerTintColor: 'white',
          tabBarActiveTintColor: '#3c0a6b',
        }}
      >
        <BottomTab.Screen
          name={'Welcome'}
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} color={color} name={'home'} />
            ),
          }}
        ></BottomTab.Screen>
        <BottomTab.Screen
          name={'User'}
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} color={color} name={'person'} />
            ),
          }}
        ></BottomTab.Screen>
      </BottomTab.Navigator>
    </NavigationContainer>
    /*<NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: '#3c0a6b',
          drawerActiveTintColor: '#fff',
          drawerLabelStyle: { fontWeight: 'bold' },
          // drawerStyle: { backgroundColor: '#ccc' },
          headerStyle: { backgroundColor: '#3c0a6b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={WelcomeScreen}
          options={{
            drawerLabel: 'Welcome Screen',
            drawerIcon: ({ color, size }) => (
              <Ionicons size={size} name={'home'} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={UserScreen}
          options={{
            drawerLabel: 'User Screen',
            drawerIcon: ({ color, size }) => (
              <Ionicons size={size} name={'person'} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>*/
  );
}
