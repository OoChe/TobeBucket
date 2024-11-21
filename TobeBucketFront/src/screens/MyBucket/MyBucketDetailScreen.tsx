/* [버킷리스트 상세 정보 화면]
1) 추가할 내용
- 디데이 자동 계산하기
 */
import React, {useEffect, useState} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import BucketDetailDropdown from '../../components/BucketDetailDropdown';
import CategoryButton from '../../components/CategoryButton';
import StickerEmpty from '../../components/StickerEmpty';
import MilestoneShort from '../../components/MilestoneShort';
import PageTitle from '../../components/PageTitle';
import {achievedDetailData} from '../../data/tempBucketData';
import {getCategoryById} from '../../data/bucketCategories';

const MyBucketDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bucketId} = route.params as {bucketId: number};

  interface friendId {
    friendId: string;
  }

  const [bucketDetail, setBucketDetail] = useState<{
    bucketId: number;
    bucketName: string;
    bucketContent: string;
    goalDate: string;
    category: number;
    createDate: Date;
    friendIds: friendId[];
    semiGoalData: Map<string, number>;
    goalReview: string;
    achievementMedia: string;
  }>();

  useEffect(() => {
    // 서버에서 bucketID를 사용하여 데이터 요청
    // fetch(`/buckets/${bucketId}`)
    //   .then(response => response.json())
    //   .then(data => setBucketDetail(data))
    //   .catch(error => console.error('Error fetching bucket detail:', error));
    // 서버 적용 시 아래 내용 삭제
    setBucketDetail(achievedDetailData);
  }, [bucketId]);

  if (!bucketDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={require('../../assets/icons/backArrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <View style={{marginLeft: -5, marginTop: -6}}>
              <PageTitle title="버킷 상세정보" colorCode="#B6E7CC" />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Pretendard-ExtraBold',
                  fontSize: 28,
                  color: '#3f6262',
                }}>
                {bucketDetail.bucketName}
              </Text>
              <Text
                style={{
                  fontFamily: 'Pretendard-Light',
                  fontSize: 13,
                  color: '#878787',
                  marginBottom: 10,
                }}>
                생성일 - {bucketDetail.createDate}
              </Text>
            </View>
            <StickerEmpty />
          </View>
          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                marginTop: 12,
              }}>
              <Text
                style={{
                  fontFamily: 'Pretendard-ExtraBold',
                  fontSize: 28,
                }}>
                D-0000
              </Text>
              <Text
                style={{
                  fontFamily: 'Pretendard-Bold',
                  fontSize: 14,
                  color: '#1e6969',
                  marginTop: 15,
                  marginLeft: 10,
                }}>
                {bucketDetail.goalDate} 목표
              </Text>
              <BucketDetailDropdown/>
            </View>
            <Text style={styles.middleText}>세부 설명</Text>
            <View style={styles.textContainer}>
              <Text style={styles.normalText}>
                {bucketDetail.bucketContent}
              </Text>
            </View>
            <Text style={styles.middleText}>카테고리</Text>
            <CategoryButton
              icon={getCategoryById(bucketDetail.category).icon}
              label={getCategoryById(bucketDetail.category).label}
              borderColor={getCategoryById(bucketDetail.category).borderColor}
              onPress={null}
              isSelected={true}
            />
            <Text style={styles.middleText}>함께하는 친구</Text>
            {/* 함께 하는 친구 목록 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {bucketDetail.friendIds.map(friendId => (
                <View key={friendId.friendId} style={styles.friendBox}>
                  <Text style={styles.friendText}>@{friendId}</Text>
                </View>
              ))}
            </View>
            {bucketDetail.semiGoalData ? (
              <View>
                <Text style={styles.middleText}>중간 목표</Text>
                <View>
                  {Array.from(bucketDetail.semiGoalData).map(
                    ([semiGoalName, stickerNum]) => (
                      <View key={semiGoalName}>
                        <MilestoneShort // key는 고유한 값으로 설정
                          title={semiGoalName}
                          stickerNum={stickerNum}
                          onPress={null}
                        />
                      </View>
                    ),
                  )}
                </View>
              </View>
            ) : null}
            <View>
              <Text style={styles.middleText}>달성 후기</Text>
              <View style={styles.textContainer}>
                {bucketDetail.achievementMedia ? (
                  <Image
                    source={{uri: bucketDetail.achievementMedia}}
                    style={styles.imageContainer}></Image>
                ) : null}
                {bucketDetail.goalReview ? (
                  <Text style={styles.normalText}>
                    {bucketDetail.goalReview}
                  </Text>
                ) : null}
                {}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBucketDetailScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 20,
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#EDF7F2',
    paddingLeft: 15,
  },
  textContainer: {
    width: 363,
    minHeight: 60, // 기본 높이 설정
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'relative',
    paddingHorizontal: 4, // 텍스트 좌우 간격을 위해 추가
    paddingVertical: 1, // 텍스트 상하 간격을 위해 추가
    marginBottom: 10,
  },
  friendBox: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 1,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3f6262',
    marginRight: 10,
  },
  middleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    position: 'relative',
    marginVertical: 5,
  },
  normalText: {
    display: 'flex',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    padding: 5,
  },
  noDataText: {
    top: 17,
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#707070',
    position: 'relative',
    textAlign: 'center',
  },
  friendText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  imageContainer: {
    width: 330,
    height: 200,
    borderRadius: 10,
    position: 'relative',
    marginLeft: 12,
    marginTop: 5,
  },
});
