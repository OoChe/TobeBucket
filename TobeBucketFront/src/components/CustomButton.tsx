/*
 [버튼 컴포넌트]
  - 파라미터
    1) text : 버튼 내 텍스트 내용
    2) colorCode : 버튼 선/면 색상
    3) filled : 색상 채우기 여부
 */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
  text: string;
  colorCode: string;
  filled: boolean;
  onPress: () => void;
}

const CustomButton = ({text, colorCode, filled = true, onPress}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress} // 상위 컴포넌트의 onPress를 실행
      style={[
        styles.button,
        {
          backgroundColor: filled ? colorCode : 'transparent',
          borderColor: colorCode,
        },
      ]}>
      <Text
        style={[styles.buttonText, {color: filled ? '#FFFFFF' : colorCode}]}>
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
