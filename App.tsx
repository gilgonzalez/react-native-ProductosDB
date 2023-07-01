import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/navigator/Navigator';
import { ThemeProvider } from './src/context/theme/ThemeContext';
import TabAndroid from './src/navigator/BottomTabNavigator';
import { AuthProvider } from './src/context/auth/AuthContext';

const AppAuthState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

const App = () => {
  const user = true;
  return (
    <NavigationContainer>
      <AppAuthState>
        <ThemeProvider>
          {
            user
              ? <AuthStack />
              : <TabAndroid />
          }
        </ThemeProvider>
      </AppAuthState>
    </NavigationContainer>
  );
};

export default App;
