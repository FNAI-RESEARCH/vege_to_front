/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateProfilePage from './pages/CreateProfilePage'
import ProfileListPage from './pages/ProfileListPage'
import PorfilePage from './pages/ProfilePage'

const Stack = createNativeStackNavigator();

const App = ()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen 
          options={{
            headerShown: false
          }}
          name="ProfileList" component={ProfileListPage} />
        <Stack.Screen name="CreateProfile" component={CreateProfilePage} 
          options={{
            headerTitle: ""
          }}/>
        <Stack.Screen name="Profile" 
          options={{
            headerTitle: "프로필"
          }}
          component={PorfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
