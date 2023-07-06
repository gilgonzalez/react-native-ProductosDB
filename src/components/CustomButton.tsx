import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  iconName?: string
  onPress: () => void;
  styles?: ViewStyle
  textStyle?: TextStyle
  colorIcon?: string
  sizeIcon?: number
}

const CustomButton = ({ title, iconName, onPress, styles = {}, textStyle = {}, colorIcon = 'white', sizeIcon = 16 }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[intrinsicStyle.container, {...styles}]}
    >
      {iconName && <Icon name={ iconName} color={colorIcon} size={sizeIcon}/>}
      <Text style={ [intrinsicStyle.text, textStyle]}>{ title }</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const intrinsicStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
