import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

const LoadinScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size={50}
        color="black"
       />
    </View>
  );
};

export default LoadinScreen;
