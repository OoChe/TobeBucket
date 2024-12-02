/* [버킷리스트 상세 정보 화면] 
1) 파라미터
- bucketId: 상세정보를 보고자 하는 버킷 ID -> router로 받아옴
- bucketList: 특정 버킷리스트의 상세 정보 포함
2) 메소드
- getMyBucket(): 서버로부터 버킷리스트 상세 정보를 받아오는 함수 
- handleSemiGoalRecord(): 중간 목표 클릭 시 중간 목표 달성 화면으로 이동
- handleEditBucket(): 오른쪽 위 상세 버튼에서 수정하기 버튼을 누르는 경우, 수정 화면으로 이동
- formatDDay(): 목표 날짜 설정 시 해당 날짜에 따른 디데이 표시
*/
import React, {useCallback, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import BucketDetailDropdown from '../../components/BucketDetailDropdown';
import CategoryButton from '../../components/CategoryButton';
import StickerEmpty from '../../components/StickerEmpty';
import MilestoneShort from '../../components/MilestoneShort';
import PageTitle from '../../components/PageTitle';
import {calculateDDay} from '../../components/dateFunc';
import {getCategoryById} from '../../data/bucketCategories';
import {getStickerById} from '../../data/StickerData';
import styles from '../../styles/MyBucketDetailScreen.styles';
import {getMyBucketDetail} from '../../apis/bucket/bucketService';
import {BucketDetail} from '../../apis/types';
import AchieveDetailDropdown from '../../components/AchieveDetailDropdown';

const MyBucketDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bucketId} = route.params as {bucketId: number};
  const [bucketList, setBucketList] = useState<BucketDetail>();

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
  };

  useFocusEffect(
    useCallback(() => {
      getMyBucket();
    }, []),
  );

  if (!bucketList) {
    return (
      <View
        style={[
          styles.main,
          {flex: 1, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text>Loading...</Text>
      </View>
    );
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
    console.log('수정 선택');
    navigation.navigate('EditBucket', {bucketId: bucketId});
  };

  const formatDDay = (goalDate: string): string => {
    const dDay = calculateDDay(goalDate);
    return dDay < 0 ? `D+${Math.abs(dDay)}` : `D-${dDay}`;
  };

  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
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
            {bucketList.stickerId ? (
              <Image
                source={getStickerById(bucketList.stickerId)?.stickerPath}
                style={styles.sticker}
              />
            ) : (
              <StickerEmpty />
            )}
          </View>
          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
              }}>
              {bucketList.achievementDate ? (
                <Text
                  style={{
                    fontFamily: 'Pretendard-ExtraBold',
                    fontSize: 28,
                    color: '#1e6969',
                  }}>
                  {bucketList.achievementDate} 달성!
                </Text>
              ) : bucketList.goalDate ? (
                <>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-ExtraBold',
                      fontSize: 28,
                    }}>
                    {formatDDay(bucketList.goalDate)}
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
                </>
              ) : null}
              <View style={{position: 'absolute', right: 20, marginTop: 10}}>
                {bucketList.achievementDate ? (
                  <AchieveDetailDropdown bucketId={bucketList.bucketId} />
                ) : (
                  <BucketDetailDropdown
                    bucketId={bucketList.bucketId}
                    bucketName={bucketList.bucketName}
                    handleEditBucket={handleEditBucket}
                  />
                )}
              </View>
            </View>
            <Text style={styles.middleText}>세부 설명</Text>
            <View style={styles.textContainer}>
              <Text style={styles.normalText}>{bucketList.bucketContent}</Text>
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
              {bucketList?.friendNickname?.map(friendId => (
                <View key={friendId} style={styles.friendBox}>
                  <Text style={styles.friendText}>@{friendId}</Text>
                </View>
              )) || (
                <Text style={styles.friendText}>함께하는 친구가 없습니다.</Text>
              )}
            </View>
            {bucketList.semiGoalData && bucketList.semiGoalData.length > 0 ? (
              <View>
                <Text style={styles.middleText}>중간 목표</Text>
                <View>
                  {bucketList.semiGoalData.map((semiGoal, index) => (
                    <TouchableOpacity
                      key={`${semiGoal.stickerId}-${index}`}
                      onPress={() =>
                        handleSemiGoalRecord({
                          bucketId: bucketList.bucketId,
                          bucketName: bucketList.bucketName,
                          semiGoalId: index,
                          semiGoalName: semiGoal.semiGoalTitle,
                        })
                      }>
                      <MilestoneShort
                        title={semiGoal.semiGoalTitle}
                        stickerNum={semiGoal.stickerId}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}

            <View>
              {bucketList.achievementDate ? (
                <>
                  <Text style={styles.middleText}>달성 후기</Text>
                  <View style={styles.textContainer}>
                    {bucketList.achievementMedia ? (
                      <Image
                        source={{uri: bucketList.achievementMedia}}
                        style={styles.imageContainer}
                      />
                    ) : null}
                    {bucketList.goalReview ? (
                      <Text style={styles.normalText}>
                        {bucketList.goalReview}
                      </Text>
                    ) : null}
                  </View>
                </>
              ) : bucketList.goalReview ? (
                <Text style={styles.normalText}>{bucketList.goalReview}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MyBucketDetailScreen;
