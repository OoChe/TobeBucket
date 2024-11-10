import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ViewMyBucketToggle = ({ onSelect }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const handleToggle = (tab) => {
    setSelectedTab(tab);
    onSelect(tab); // 부모 컴포넌트(MyBucketScreen)로 선택된 탭 전달
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTab === 'upcoming' ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleToggle('upcoming')}>
        <Text
          style={
            selectedTab === 'upcoming'
              ? styles.selectedText
              : styles.unselectedText
          }>
          달성 예정 버킷
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTab === 'achieved' ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleToggle('achieved')}>
        <Text
          style={
            selectedTab === 'achieved'
              ? styles.selectedText
              : styles.unselectedText
          }>
          달성한 버킷
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#C4EBD5',
    borderRadius: 8,
    padding: 4,
    margin: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  selectedButton: {
    flex: 0.9,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
  },
  unselectedButton: {
    backgroundColor: 'transparent',
  },
  selectedText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#6c757d',
  },
});

export default ViewMyBucketToggle;
