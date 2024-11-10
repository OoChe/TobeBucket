import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
  text: string;
  colorCode: string;
  filled: boolean;
}

const CustomButton = ({text, colorCode, filled = true}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: filled ? colorCode : 'transparent',
          borderColor: colorCode,
        },
      ]}>
      <Text style={[styles.buttonText, {color: filled ? '#FFFFFF' : colorCode}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 145,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 125,
    padding: 3,
  },
  buttonText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CustomButton;
