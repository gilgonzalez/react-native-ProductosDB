//TODO BOTTOM TAB NAVIGATOR
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/theme/ThemeContext';


const Tab = createBottomTabNavigator();

const TabAndroid = () => {

  const { theme } = useContext(ThemeContext);


  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          height: 0,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.aditionalColors.tabBarBottom,
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 40,
          borderTopStartRadius: 1000,
          borderTopEndRadius: 1000,
        },
      }}
    >
      <Tab.Screen
        name={'whatevet'}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Listado',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => (
            <Icon color={color} size={25} name="list" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabAndroid;
