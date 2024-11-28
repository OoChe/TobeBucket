/* [빈 스티커 컴포넌트]
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';

const DashedCircle = () => {
  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 50, // 원의 지름
    height: 50,
    borderRadius: 50, // 지름의 절반으로 설정
    borderWidth: 1.5, // 테두리 두께
    borderColor: '#888888', // 테두리 색상
    borderStyle: 'dashed', // 테두리를 점선으로 설정
    backgroundColor: 'transparent', // 배경색 투명
  },
});

export default DashedCircle;
