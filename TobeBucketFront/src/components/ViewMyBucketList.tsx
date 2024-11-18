/*
[달성 예정 버킷리스트 목록 컴포넌트]
1) 카테고리 스크롤바 표시
2) 달성 예정 버킷리스트 목록
*/
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import MyBucketShort from './MyBucketShort';
import HorizontalCategory from './HorizontalCategory';

interface upcomingBucket {
  bucketId: number;
  bucketName: string;
  bucketContent: string;
  goalDate: string;
  category: number;
}

interface upcomingBucketList {
  bucketList: upcomingBucket[]; // 올바른 타입 지정
}

const ViewMyBucketList = ({bucketList}: upcomingBucketList) => {
  const handleCategorySelect = (categoryId: string) => {};
  return (
    <View style={styles.bucketListContainer}>
      <HorizontalCategory/>
      <ScrollView>
        {bucketList.map(item => (
          <View key={item.bucketId}>
            <MyBucketShort
              bucketID={item.bucketId}
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
