import React, {useState, useCallback} from 'react';
import {ScrollView, Text, View, Image, ActivityIndicator} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import ViewMyBucketToggle from '../../components/ViewMyBucketToggle';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import ViewMyBucketList from '../../components/ViewMyBucketList';
import ViewBucketList from '../../components/ViewBucketList';
import CryingBucket from '../../assets/images/CryingBucketImg.png';
import noAchievedBucket from '../../assets/images/noAchievedBucket.png';
import styles from '../../styles/MyBucketScreen.styles';
import {
  getMyUpcomingBucketList,
  getMyAchievedBucketList,
} from '../../apis/bucket/bucketService';
import {upcomingBucket, achievedBucket} from '../../apis/types';

const MyBucketScreen = () => {
  const [upcomingBucketList, setUpcomingBucketList] = useState<
    upcomingBucket[]
  >([]);
  const [achievedBucketList, setAchievedBucketList] = useState<
    achievedBucket[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<false | true>(false);
  const navigation = useNavigation();

  const handleWriteBucket = () => {
    navigation.navigate('WriteBucket');
  };
  const handleViewTemplate = () => {
    navigation.navigate('ViewTemplate');
  };
  const getMyBucketList = async (mode: typeof viewMode) => {
    try {
      setLoading(true);
      if (viewMode === false) {
        const data = await getMyUpcomingBucketList(false);
        setUpcomingBucketList(data);
      } else {
        const data = await getMyAchievedBucketList(true);
        setAchievedBucketList(data);
        console.log(achievedBucketList);
      }
      setLoading(false);
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
      getMyBucketList(viewMode);
      renderBucketList();
    }, [viewMode]),
  );

  const renderBucketList = () => {
    if (viewMode === false) {
      return upcomingBucketList && upcomingBucketList.length > 0 ? (
        <ViewMyBucketList bucketList={upcomingBucketList} />
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.smallText}>아직 작성한 버킷이 없어요</Text>
          <Image source={CryingBucket} style={styles.imageStyle} />
          <Text style={styles.largeText}>버킷을 작성하러 가볼까요?</Text>
          <CustomButton
            text="버킷 작성하러가기"
            colorCode="#1e6969"
            filled={true}
            onPress={handleWriteBucket}
          />
          <CustomButton
            text="템플릿 구경하기"
            colorCode="#1e6969"
            filled={false}
            onPress={handleViewTemplate}
          />
        </ScrollView>
      );
    } else if (viewMode === true) {
      return achievedBucketList && achievedBucketList.length > 0 ? (
        <ViewBucketList bucketList={achievedBucketList} />
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.smallText}>아직 달성한 버킷이 없어요</Text>
          <Image source={noAchievedBucket} style={styles.imageStyle} />
          <Text style={styles.largeText}>
            열심히 노력해서
            {'\n'} 버킷을 달성해봐요!
          </Text>
        </ScrollView>
      );
    }
  };

  return (
     <View style={[styles.main, { flex: 1 }]}>
      <PageTitle title="나의 버킷" colorCode="#B6E7CC" />
      <ViewMyBucketToggle onSelect={setViewMode} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e6969" />
        </View>
      ) : (
        renderBucketList()
      )}
    </View>
  );
};

export default MyBucketScreen;
