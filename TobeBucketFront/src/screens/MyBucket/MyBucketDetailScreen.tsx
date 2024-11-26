/* [버킷리스트 상세 정보 화면] */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import BucketDetailDropdown from '../../components/BucketDetailDropdown';
import CategoryButton from '../../components/CategoryButton';
import StickerEmpty from '../../components/StickerEmpty';
import MilestoneShort from '../../components/MilestoneShort';
import PageTitle from '../../components/PageTitle';
import {getCategoryById} from '../../data/bucketCategories';
import {calculateDDay} from '../../components/dateFunc';
import styles from '../../styles/MyBucketDetailScreen.styles';
import {getMyBucketDetail} from '../../apis/bucket/bucketService';
import {BucketDetail} from '../../apis/types';

const MyBucketDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bucketId} = route.params as {bucketId: number};
  const [bucketList, setBucketList] = useState<BucketDetail>();
  const [editBucketInfo, setEditBucketInfo] = useState<{
    bucketId: number;
    bucketContent: string;
    category: number;
    friendIds: string[];
    semiGoalData: Map<string, number>;
    publicStatus: boolean;
  }>();

  const getMyBucket = async () => {
    try {
      const data = await getMyBucketDetail(bucketId);
      setBucketList(data);
    } catch (err: any) {
      console.error('달성 예정 로드 오류:', err);
      setError(
        err.message ||
          '스크린에서 버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }

    useEffect(() => {
      getMyBucket();
      if (bucketList) {
        setEditBucketInfo({
          bucketId: bucketList.bucketId,
          bucketContent: bucketList.bucketContent,
          category: bucketList.category,
          friendIds: bucketList.friendIds,
          semiGoalData: bucketList.semiGoalData,
          publicStatus: false, // publicStatus는 기본값 또는 필요에 따라 설정
        });
      }
    }, []);

    if (!bucketList) {
      return <Text>Loading...</Text>;
    }
    const handleSemiGoalRecord = ({
      bucketId,
      bucketName,
      semiGoalId,
      semiGoalName,
    }: semiGoalProps) => {
      navigation.navigate('SemiGoalRecord', {
        bucketId: bucketId,
        bucketName: bucketName,
        semiGoalId: semiGoalId,
        semiGoalName: semiGoalName,
      });
    };
    const handleEditBucket = () => {
      setEditBucketInfo({
        bucketId: bucketList.bucketId,
        bucketContent: bucketList.bucketContent,
        category: bucketList.category,
        friendIds: bucketList.friendIds,
        semiGoalData: bucketList.semiGoalData,
        publicStatus: false, // publicStatus는 기본값 또는 필요에 따라 설정
      });
      console.log('수정 선택');
      navigation.navigate('EditBucket', {editBucketInfo});
      console.log('navgiate 요청 보낸 후의 결과', editBucketInfo);
    };

    return (
      <View style={styles.main}>
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
                  {bucketList.bucketName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Pretendard-Light',
                    fontSize: 13,
                    color: '#878787',
                    marginBottom: 10,
                  }}>
                  생성일 - {bucketList.createDate}
                </Text>
              </View>
              {/* 스티커 정보가 안보임 */}
              <StickerEmpty />
            </View>
            <View style={styles.contentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                }}>
                <Text
                  style={{
                    fontFamily: 'Pretendard-ExtraBold',
                    fontSize: 28,
                  }}>
                  D-{calculateDDay(bucketList.goalDate)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Pretendard-Bold',
                    fontSize: 14,
                    color: '#1e6969',
                    marginTop: 15,
                    marginLeft: 10,
                  }}>
                  {bucketList.goalDate} 목표
                </Text>
                <View style={{position: 'absolute', right: 20, marginTop: 10}}>
                  <BucketDetailDropdown
                    bucketId={bucketList.bucketId}
                    bucketName={bucketList.bucketName}
                    handleEditBucket={handleEditBucket}
                  />
                </View>
              </View>
              <Text style={styles.middleText}>세부 설명</Text>
              <View style={styles.textContainer}>
                <Text style={styles.normalText}>
                  {bucketList.bucketContent}
                </Text>
              </View>
              <Text style={styles.middleText}>카테고리</Text>
              <CategoryButton
                icon={getCategoryById(bucketList.category).icon}
                label={getCategoryById(bucketList.category).label}
                borderColor={getCategoryById(bucketList.category).borderColor}
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
                {bucketList.friendIds.map(friendId => (
                  <View key={friendId.friendId} style={styles.friendBox}>
                    <Text style={styles.friendText}>@{friendId}</Text>
                  </View>
                ))}
              </View>
              {bucketList.semiGoalData ? (
                <View>
                  <Text style={styles.middleText}>중간 목표</Text>
                  <View>
                    {Array.from(bucketList.semiGoalData).map(
                      ([semiGoalName, stickerNum], index) => (
                        <TouchableOpacity
                          key={semiGoalName}
                          onPress={() =>
                            handleSemiGoalRecord({
                              bucketId: bucketList.bucketId,
                              bucketName: bucketList.bucketName,
                              semiGoalId: index,
                              semiGoalName: semiGoalName,
                            })
                          }>
                          <MilestoneShort
                            title={semiGoalName}
                            stickerNum={stickerNum}
                          />
                        </TouchableOpacity>
                      ),
                    )}
                  </View>
                </View>
              ) : null}
              <View>
                <Text style={styles.middleText}>달성 후기</Text>
                <View style={styles.textContainer}>
                  {bucketList.achievementMedia ? (
                    <Image
                      source={{uri: bucketList.achievementMedia}}
                      style={styles.imageContainer}></Image>
                  ) : null}
                  {bucketList.goalReview ? (
                    <Text style={styles.normalText}>
                      {bucketList.goalReview}
                    </Text>
                  ) : null}
                  {}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
};
export default MyBucketDetailScreen;