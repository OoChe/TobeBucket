/* [버킷리스트 항목 별 아이콘 컴포넌트]
- 매개변수: category ID(번호)
- 전체 보기를 제외한 나머지 카테고리에 대한 이미지와 라벨 표시
*/

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { getCategoryIconPathById, getCategoryLabelById } from '../data/bucketCategories';

export const CategoryIcon = ({category}: number) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={getCategoryIconPathById(category)} style={styles.icon} />
      <Text style={styles.categoryText}>{getCategoryLabelById(category)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'relative',
    marginTop: 10,
  },
  categoryText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    position: 'relative',
    textAlign: 'center',
    marginTop: 3,
  },
});
