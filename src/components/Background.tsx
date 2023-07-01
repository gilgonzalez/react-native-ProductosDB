import React from 'react';
import { Dimensions, View } from 'react-native';

const height = Dimensions.get('window').height;

const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#5856D6',
        width: 1000,
        height: 1200,
        transform: [{ rotate: '-70deg' }],
        top:height - 1150,
      }
      }
    />
  );
};

export default Background;
