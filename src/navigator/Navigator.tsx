import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { AuthStackParamList, AuthStackScreens } from './types';
import SignInScreen from '../screens/SignInScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      },
    }}
    >
    <Stack.Screen name={AuthStackScreens.LOGIN} component={LoginScreen} />
    <Stack.Screen name={AuthStackScreens.SIGNIN} component={SignInScreen} />
    </Stack.Navigator>
  );
};
