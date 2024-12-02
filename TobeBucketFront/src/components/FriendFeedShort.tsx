/*
 [친구 피드 버킷 컴포넌트]
1) 파라미터
  - id: 버킷별 고유번호
  - title: 버킷리스트 제목
  - achieveDate: 버킷리스트 달성 일자
  - category: 버킷리스트 카테고리
  - achievementMedia: 버킷리스트에 첨부한 사진 이미지
- 
*/
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FriendFeedBucket} from '../apis/types';

export const FriendFeedShort = ({
  nickname,
  mbti,
  profileImage,
  bucketName,
  bucketContent,
  achieveDate,
  achievementMedia,
}: FriendFeedBucket) => {
  return (
    <View style={styles.bucketContainer}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={styles.userInfo}>
          {/* Profile Image */}
          <Image source={{uri: profileImage}} style={styles.profileImage} />
          {/* Username */}
          <Text style={styles.username}>{nickname}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.titleText}>{bucketName}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{mbti}</Text>
            </View>
          </View>
          {achieveDate ? (
            <Text style={styles.dateText}>{achieveDate} &nbsp;달성</Text>
          ) : null}
        </View>
      </View>
      {achievementMedia ? (
        <Image
          source={{uri: achievementMedia}}
          style={styles.imageContainer}></Image>
      ) : null}
      {bucketContent ? (
        <Text style={styles.contentText} numberOfLines={3}>
          {bucketContent}
        </Text>
      ) : null}
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
    padding: 8,
    paddingHorizontal: 15,
    gap: 5,
  },
  textContainer: {
    position: 'relative',
    marginLeft: 15,
    marginVertical: 8,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
  },
  dateText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#6C7278',
    position: 'relative',
    marginTop: 3,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  userInfo: {
    justifyContent: 'center',
  },
  badge: {
    width: 40,
    height: 18,
    justifyContent: 'center',
    backgroundColor: '#E3E3E3',
    borderRadius: 5,
    marginTop: 3,
    marginLeft: 5,
  },
  badgeText: {
    color: '#EE4963',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  username: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: 330,
    height: 200,
    borderRadius: 10,
    position: 'relative',
    marginLeft: 14,
  },
  contentText: {
    width: 330,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
});

export default FriendFeedShort;
