/* [버킷리스트 항목 별 아이콘 컴포넌트]

*/

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getCategoryIconById, getCategoryLabelById} from '../data/bucketIcon';

export const CategoryIcon = ({category}: number) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={getCategoryIconById(category)} style={styles.icon} />
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
