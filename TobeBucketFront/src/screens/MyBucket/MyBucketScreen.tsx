/*
 [내 버킷리스트 보기(달성 예정) 스크린]
 - 구성 : 
 - 함수
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewMyBucketToggle from '../../components/ViewMyBucketToggle';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import ViewMyBucketList from '../../components/ViewMyBucketList.tsx';
import MyBucketShort from '../../components/MyBucketShort.tsx';
import CategoryButton from '../../components/CategoryButton.tsx';
import { categories } from '../../data/bucketCategories.ts';
import CryingBucket from '../../assets/images/cryingBucketImg.png';
import styles from '../../styles/MyBucketScreen.styles';
import {unachievedData, achievedData} from '../../data/tempBucketData.ts';

interface upcomingBucket {
  bucketId: number;
  bucketName: string;
  bucketContent: string;
  goalDate: Date;
  category: number;
}

interface achievedBucket {
  bucketId: number;
  bucketName: string;
  achieveDate: string;
  category: number;
  achievementMedia: Date;
  recordContent: string;
}

// Toggle의 상태(달성 예정/달성 완료)에 따라 화면 변경 구현
const MyBucketScreen = () => {
  const testDate = new Date();
  const [upcomingBucketList, setUpcomingBucketList] =
    useState<upcomingBucket[]>();
  const [achievedBucketList, setAchievedBucketList] =
    useState<achievedBucket[]>();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('upcoming'); // 'upcoming' or 'achieved'
  const navigation = useNavigation();

  useEffect(() => {
    // 서버에서 버킷리스트 데이터 가져오기
    const fetchBucketList = async () => {
      setLoading(true);
      // try {
      //   const response = await fetch('YOUR_SERVER_API_ENDPOINT');
      //   const data = await response.json();
      //   setBucketList(data); // 데이터가 있으면 상태에 저장
      // } catch (error) {
      //   console.error('Failed to fetch bucket list:', error);
      // } finally {
      //   setLoading(false); // 로딩 완료 상태 설정
      // }

      // 데이터를 임의로 가져온 것처럼 설정
      if (viewMode == 'upcoming') setUpcomingBucketList(unachievedData);
      else setAchievedBucketList(achievedData);
      setLoading(false);
      console.log(upcomingBucketList)
    };

    fetchBucketList();
  }, [viewMode]);

  const handleWriteBucket = () => {
    navigation.navigate('WriteBucket');
  };
  const handleViewTemplate = () => {
    // sendDataToDB();
    // navigation.navigate('ViewTemplate');
  };
  const handleMyBucketInfo = () => {
    // sendDataToDB();
    navigation.navigate('MyBucketInfo');
  };
  return (
    <View style={{flex: 1}}>
      <PageTitle title="나의 버킷" colorCode="#B6E7CC" />
      <ViewMyBucketToggle onSelect={setViewMode} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e6969" />
        </View>
      ) : upcomingBucketList && upcomingBucketList.length > 0 ? (
        // <MyBucketShort bucketID={3} bucketContent='에라이' bucketName='실패함' goalDate={testDate} category={3}/>
        <ViewMyBucketList bucketList={upcomingBucketList} /> // 버킷리스트가 안보임. 카테고리만 보임. 대체 왜?
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.smallText}>아직 작성한 버킷이 없어요</Text>
          <Image source={CryingBucket} style={styles.imageStyle} />
          <Text style={styles.largeText}>버킷을 작성하러 가볼까요?</Text>
          <CustomButton
            text="버킷 작성하러가기"
            colorCode="#1e6969"
            filled={true}
            onPress={() => handleWriteBucket()}
          />
          <CustomButton
            text="템플릿 구경하기"
            colorCode="#1e6969"
            filled={false}
            onPress={() => handleViewTemplate()}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default MyBucketScreen;
