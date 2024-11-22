/*
 [MBTI 버튼 컴포넌트]
  - 파라미터
    1) label : MBTI 유형 설명
    2) borderColor : MBTI 유형 색
    3) onPress : 버튼 클릭 시 함수 처리
    4) isSelected : 버튼 클릭 여부
 */

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface MbtiButtonProps {
  label: string;
  borderColor: string;
  onPress: () => void;
  isSelected: boolean;
}

const MbtiButton: React.FC<MbtiButtonProps> = ({
  label,
  borderColor,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {borderColor},
        isSelected && {backgroundColor: borderColor},
      ]}
      activeOpacity={0.4}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MbtiButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 24,
    borderWidth: 1.5,
    borderRadius: 10,
    marginRight: 12,
    marginBottom: 3,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
});
