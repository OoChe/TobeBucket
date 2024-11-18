/*
[버킷리스트 카테고리 스크롤바 컴포넌트]
구현할 내용
1) 카테고리 선택 시 선택했다는 게 보이도록 표현
2) 상위 컴포넌트에서 선택한 카테고리 정보를 전달
- 처음에 있던 WriteBucketScreen.tsx 파일에 있는 내용 참조
*/
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import CategoryButton from './CategoryButton';
import {categories} from '../data/bucketCategories';

const HorizontalCategory = () => {
  return (
    <View>
      <ScrollView
        style={styles.categoryContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {[categories[6], ...categories.slice(0, 6)].map(category => (
          <CategoryButton
            icon={category.icon}
            label={category.label}
            borderColor={category.borderColor}
            onPress={() => handleCategorySelect(category.id)}
            isSelected={false} // 선택된 경우 스타일 적용 bucketInfo.category === category.id
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
