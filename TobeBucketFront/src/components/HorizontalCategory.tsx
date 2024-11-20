/*
[버킷리스트 카테고리 스크롤바 컴포넌트]
1) 변수
- selectedCategory
  : 선택된 카테고리 항목(default: 전체 보기[6])
2) 함수/인터페이스
- HorizontalCategoryProps
  : 부모 컴포넌트에 카테고리 정보를 전달하는 함수
  기본값은 전체보기[6]으로 설정
- handleCategorySelect()
  : 선택된 카테고리 상태를 업데이트한 후,
  부모 컴포넌트에 선택된 카테고리 전달
*/
import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import CategoryButton from './CategoryButton';
import {categories} from '../data/bucketCategories';

interface HorizontalCategoryProps{
  onSelectCategory: (categoryId: number) => void;
}

const HorizontalCategory = ({onSelectCategory} : HorizontalCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(6);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  }
  return (
    <View>
      <ScrollView
        style={styles.categoryContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {[categories[6], ...categories.slice(0, 6)].map((category, index) => (
          <CategoryButton
            icon={category.icon}
            label={category.label}
            borderColor={category.borderColor}
            onPress={() => handleCategorySelect((index+6)%7)}
            isSelected={selectedCategory === ((index+6)%7)}
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
