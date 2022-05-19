import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Home from './src/Home';
import Login from './src/Login';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   header: () => null,
        // }}
        >
        <Stack.Screen name="Login" component={Login} options= {{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
