/*
 [카테고리 버튼 컴포넌트]
  - 파라미터
    1) icon : 카테고리 제목
    2) label : 카테고리 설명
    3) borderColor : 카테고리 색
    4) onPress : 버튼 클릭 시 함수 처리
    5) isSelected : 버튼 클릭 여부
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryButtonProps {
  icon: string;
  label: string;
  borderColor: string;
  onPress: () => void;
  isSelected: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon, label, borderColor, onPress, isSelected }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { borderColor },
        isSelected && { backgroundColor: borderColor }
      ]}
      activeOpacity={0.4}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>

  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 27,
    borderWidth: 1.5,
    borderRadius: 10,
    marginRight: 12,
    marginBottom: 3,
  },
  icon: {
    fontSize: 14,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold'
  },

});
