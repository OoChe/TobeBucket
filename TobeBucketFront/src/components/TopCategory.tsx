/*
 [인기 카테고리 컴포넌트]
  - 파라미터
    1) categoryId : 카테고리 고유 번호
    2) rate : 달성률
 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getCategoryById, getCategoryLabelById, getCategoryIconPathById } from '../data/bucketCategories';

const TopCategory = ({ categoryId, rate }) => {
  const category = getCategoryById(categoryId);
  const iconPath = getCategoryIconPathById(categoryId);
  const label = getCategoryLabelById(categoryId);

  return (
    <View style={[styles.container, { borderColor: category.borderColor }]}>
      {/* 카테고리 아이콘 */}
      {iconPath ? (
        <Image source={iconPath} style={styles.icon} />
      ) : (
        <Text style={styles.iconFallback}>{category.icon}</Text>
      )}

      {/* 카테고리 이름 */}
      <Text style={styles.label}>{label}</Text>

      {/* 카테고리 비율 */}
      <Text style={styles.rate}>{rate}%</Text>
    </View>
  );
};

export default TopCategory;

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 0,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconFallback: {
    fontSize: 24,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // 아이콘과 비율 사이의 공간 차지
  },
  rate: {
    fontSize: 14,
    color: '#555',
  },
});
