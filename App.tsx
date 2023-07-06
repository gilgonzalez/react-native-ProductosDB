import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/navigator/Navigator';
import { ThemeProvider } from './src/context/theme/ThemeContext';
import { AuthProvider } from './src/context/auth/AuthContext';
import { ProductProvider } from './src/context/product/ProductContext';

const AppAuthState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  return (
    <AuthProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppAuthState>
        <ThemeProvider>
          <AuthStack/>
        </ThemeProvider>
      </AppAuthState>
    </NavigationContainer>
  );
};

export default App;
