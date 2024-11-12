import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryButtonProps {
  icon: string;
  label: string;
  borderColor: string;
  onPress: () => void;
  isSelected: boolean; // 선택 여부
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon, label, borderColor, onPress, isSelected }) => {

  return (
    <TouchableOpacity
      onPress={onPress} // 상위 컴포넌트의 onPress를 실행
      style={[
        styles.button,
        { borderColor },
        isSelected && { backgroundColor: borderColor } // 선택된 경우 배경색 적용
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
