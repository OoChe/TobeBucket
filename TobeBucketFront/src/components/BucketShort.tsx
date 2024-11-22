/*
 [달성한 버킷, 피드 버킷 컴포넌트]
  - 파라미터
    1) id: 버킷별 고유번호
    2) title: 버킷리스트 제목
    3) achieveDate: 버킷리스트 달성 일자
    4) category: 버킷리스트 카테고리
    5) achievementMedia: 버킷리스트에 첨부한 사진 이미지
  - 
*/
import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CategoryIcon} from './CategoryIcon';

interface bucketShortProps {
  bucketId: number;
  bucketName: string;
  achieveDate: string;
  category: number;
  achievementMedia: string;
  goalReview: string;
}

export const BucketShort = ({ bucketId, bucketName, achieveDate, category, achievementMedia, goalReview,}: bucketShortProps) => {
  const navigation = useNavigation();

  const handleMyBucketInfo = (bucketId: number) => {
    // sendDataToDB();
    navigation.navigate('MyBucketDetail', { bucketId });
  };
  useEffect(() => {
    console.log(achievementMedia);
  }, [achievementMedia]);


  return (
    <View>
      <TouchableOpacity
        style={styles.bucketContainer}
        onPress={() => handleMyBucketInfo(bucketId)}>
        <View
          style={{
            marginLeft: 14,
            flexDirection: 'row',
          }}>
          <CategoryIcon category={category} />
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {bucketName}
            </Text>
            <Text style={styles.dateText}>{achieveDate} &nbsp;달성</Text>
          </View>
          {/* 이모티콘 추가 필요 */}
        </View>
        {achievementMedia ? (
          <Image source={{ uri: achievementMedia }} style={styles.imageContainer}></Image>
        ) : (null)}
        {goalReview ? (
          <Text style={styles.reviewText} numberOfLines={3}>{goalReview}</Text>
        ) : (null)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bucketContainer: {
    width: 360,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 'auto',
    marginBottom: 10,
    paddingBottom: 15, // 텍스트 상하 간격을 위해 추가
  },
  textContainer: {
    width: 241,
    position: 'relative',
    marginLeft: 20,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
    position: 'relative',
    top: '18%',
  },
  dateText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#6C7278',
    position: 'relative',
    top: '20%',
  },
  imageContainer: {
    width: 330,
    height: 200,
    borderRadius: 10,
    position: 'relative',
    marginLeft: 14,
    marginTop: 5
  },
  reviewText: {
    width: 330,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    position: 'relative',
    top: 5,
    marginLeft: 14,
  },
});

export default BucketShort;
