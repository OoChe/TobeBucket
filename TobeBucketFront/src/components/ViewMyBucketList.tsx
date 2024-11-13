/*
[달성 예정 버킷리스트 목록 컴포넌트]
1) 카테고리 스크롤바 표시
2) 달성 예정 버킷리스트 목록
*/
import React from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import MyBucketShort from './MyBucketShort';
import CategoryButton from './CategoryButton';
import {categories} from '../data/bucketCategories';

interface upcomingBucket {
  bucketID: number;
  bucketName: string;
  bucketContent: string;
  goalDate: Date;
  category: number;
}

interface upcomingBucketList {
  bucketList: upcomingBucket[]; // 올바른 타입 지정
}

const ViewMyBucketList = ({bucketList}: upcomingBucketList) => {
  const handleCategorySelect = (categoryId: string) => {};
  return (
    <View style={styles.bucketListContainer}>
      <ScrollView
        style={styles.categoryContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // 스크롤바 표시 여부
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
      <ScrollView>
        {bucketList.map(item => (
          <View key={item.bucketID}>
            <MyBucketShort
              bucketID={item.bucketID}
              bucketName={item.bucketName}
              bucketContent={item.bucketContent}
              goalDate={item.goalDate}
              category={item.category}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewMyBucketList;

const styles = StyleSheet.create({
  categoryContainer: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  bucketListContainer: {
    flexDirection: 'column',
    height: 480,
  },
});
