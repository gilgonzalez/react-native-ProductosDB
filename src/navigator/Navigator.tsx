import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { AuthStackParamList, AuthStackScreens } from './types';
import SignInScreen from '../screens/SignInScreen';
import { AuthContext, status } from '../context/auth/AuthContext';
import TabAndroid from './BottomTabNavigator';
import LoadinScreen from '../screens/LoadinScreen';
import ProductsNavigator from './ProductsNavigator';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const { status: currentStatus } = useContext(AuthContext);

  // eslint-disable-next-line curly
  if (currentStatus === status.CHECKING) return <LoadinScreen />;

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      },
    }}
    >
      {
        currentStatus !== status.AUTHENTICATED
          ? (
            <>
              <Stack.Screen name={AuthStackScreens.LOGIN} component={LoginScreen} />
              <Stack.Screen name={AuthStackScreens.SIGNIN} component={SignInScreen} />
            </>
          )
          : (
            <>
              <Stack.Screen name={ AuthStackScreens.PRODUCTSNAVIGATOR} component={ProductsNavigator} />
              <Stack.Screen name={AuthStackScreens.MAINSCREEN} component={TabAndroid} />
            </>
          )
      }
    </Stack.Navigator>
  );
};
