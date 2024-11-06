import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ViewMyBucketToggle = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming'); // 'upcoming' or 'achieved'

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTab === 'upcoming' ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => setSelectedTab('upcoming')}
      >
        <Text style={selectedTab === 'upcoming' ? styles.selectedText : styles.unselectedText}>
          달성 예정 버킷
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTab === 'achieved' ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => setSelectedTab('achieved')}
      >
        <Text style={selectedTab === 'achieved' ? styles.selectedText : styles.unselectedText}>
          달성한 버킷
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#B6E7CC', // 파스텔 톤 민트색 배경
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
    backgroundColor: '#ffffff', // 선택된 버튼은 하얀색 배경
  },
  unselectedButton: {
    backgroundColor: 'transparent', // 선택되지 않은 버튼은 투명
  },
  selectedText: {
    color: '#000000', // 선택된 버튼의 텍스트 색
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#6c757d', // 선택되지 않은 버튼의 텍스트 색 (회색 톤)
  },
});

export default ViewMyBucketToggle;