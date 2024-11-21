/* [ 버킷리스트 상세 정보 옵션 드롭다운 컴포넌트]
*/
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dots from '../assets/icons/dots.png'

const BucketDetailDropdown = () => {
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option: string) => {
    console.log(`${option} selected`);
    setDropdownVisible(false);
  };
  const handleAchievementRecord = () => {
    navigation.navigate('AchievementRecord');
  };

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={dots} style={{ marginLeft: 120, marginTop: 5 }} />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleAchievementRecord()}>
            <Text style={styles.optionText}>달성 기록하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionPress('수정하기')}>
            <Text style={styles.optionText}>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionPress('삭제하기')}>
            <Text style={styles.optionText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
    padding: 5,
  },
  optionText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#333',
  },
});

export default BucketDetailDropdown;
