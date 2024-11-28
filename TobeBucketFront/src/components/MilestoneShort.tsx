/* [중간목표 컴포넌트]
1) 변수
- text: 중간목표 제목
*/
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {getStickerById} from '../data/StickerData';

interface milestoneProps {
  title: string;
  stickerNum: number;
}

const MilestoneShort = ({title, stickerNum}: milestoneProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle} numberOfLines={1}>
        {title}
      </Text>
      {stickerNum !== null && stickerNum !== undefined ? (
        // stickerNum이 유효할 때 렌더링할 내용
        <Image
          source={getStickerById(stickerNum)?.stickerPath}
          style={styles.sticker}
        />
      ) : (
        // stickerNum이 null 또는 undefined일 때 렌더링할 내용
        <View style={styles.circle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 363,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    width: 280,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
  },
  sticker: {
    width: 30,
    height: 30,
  },
  circle: {
    width: 30, // 원의 지름
    height: 30,
    borderRadius: 50, // 지름의 절반으로 설정
    borderWidth: 1.5, // 테두리 두께
    borderColor: '#888888', // 테두리 색상
    borderStyle: 'dashed', // 테두리를 점선으로 설정
    backgroundColor: 'transparent', // 배경색 투명
  },
});

export default MilestoneShort;
