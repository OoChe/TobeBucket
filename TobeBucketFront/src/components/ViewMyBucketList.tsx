/*
[달성 예정 버킷리스트 목록 컴포넌트]
1) 카테고리 스크롤바 표시
2) 달성 예정 버킷리스트 목록
*/
import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import MyBucketShort from './MyBucketShort';
import HorizontalCategory from './HorizontalCategory';
import { upcomingBucket } from '../apis/types';

interface upcomingBucketList {
  bucketList: upcomingBucket[]; // 올바른 타입 지정
}

const ViewMyBucketList = ({bucketList}: upcomingBucketList) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(6);
  
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    console.log(categoryId);
  };

  const filteredBucketList = selectedCategory === 6
    ? bucketList // 전체보기 선택 시 모든 버킷리스트 표시
    : bucketList.filter(item => item.category === selectedCategory);

  return (
    <View style={styles.bucketListContainer}>
      <HorizontalCategory onSelectCategory={handleCategorySelect}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {filteredBucketList.map(item => (
          <View key={item.bucketId}>
            <MyBucketShort
              bucketId={item.bucketId}
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
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
