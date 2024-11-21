/* [중간목표 컴포넌트]
1) 변수
- text: 중간목표 제목
*/
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import StickerEmpty from './StickerEmpty';

interface milestoneProps{
  title: string,
  stickerNum: number,
  onPress: void,
}

const MilestoneShort = ({title, stickerNum, onPress}: milestoneProps) => {
  return (
    <View
      style={styles.container}>
      <Text
        style={styles.textStyle}
        numberOfLines={1}>
        {title}
      </Text>
      <StickerEmpty/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 363,
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  },
  textStyle: {
    width: 260,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
  },
  sticker: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default MilestoneShort;
