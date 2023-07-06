import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

export enum ProductNavigatorScreens {
  PRODUCTSSCREEN = 'ProductsScreen',
  PRODUCTSCREEN = 'ProductScreen'
}

export type ProductsStackParam = {
  [ProductNavigatorScreens.PRODUCTSSCREEN]: undefined,
  [ProductNavigatorScreens.PRODUCTSCREEN]: { id? : number, name? : string}
}

const Stack = createStackNavigator<ProductsStackParam>();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
        },
      }}
    >
      <Stack.Screen name={ProductNavigatorScreens.PRODUCTSSCREEN} component={ProductsScreen} options={{title:'Productos'}}/>
      <Stack.Screen name={ProductNavigatorScreens.PRODUCTSCREEN} component={ProductScreen} />

    </Stack.Navigator>
  );
};

export default ProductsNavigator;
