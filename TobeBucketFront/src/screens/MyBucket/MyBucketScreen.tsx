import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ViewMyBucketToggle from '../../components/ViewMyBucketToggle';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import ViewMyBucketList from '../../components/ViewMyBucketList';
import CryingBucket from '../../assets/images/cryingBucketImg.png';
import noAchievedBucket from '../../assets/images/noAchievedBucket.png';
import styles from '../../styles/MyBucketScreen.styles';
import { unachievedData, achievedData } from '../../data/tempBucketData.ts';

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
  achieveDate: Date;
  category: number;
  achievementMedia: string;
  recordContent: string;
}

const MyBucketScreen = () => {
  const [upcomingBucketList, setUpcomingBucketList] = useState<upcomingBucket[]>([]);
  const [achievedBucketList, setAchievedBucketList] = useState<achievedBucket[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'upcoming' | 'achieved'>('upcoming');
  const navigation = useNavigation();

  const fetchBucketList = async (mode: 'upcoming' | 'achieved') => {
    setLoading(true);
    try {
      // api logic 추가
      // const response = await fetch(`/tobebucket/bucketlists/${mode}`);
      // const data = await response.json();
      if (mode === 'upcoming') {
        setUpcomingBucketList(unachievedData);
      } else {
        setAchievedBucketList(null);
      }
    } catch (error) {
      console.error(`Failed to fetch ${mode} bucket list:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBucketList(viewMode);
  }, [viewMode]);

  const renderBucketList = () => {
    if (viewMode === 'upcoming') {
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
    } else if (viewMode === 'achieved') {
      return achievedBucketList && achievedBucketList.length > 0 ? (
        <ViewMyBucketList bucketList={achievedBucketList} />
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.smallText}>아직 달성한 버킷이 없어요</Text>
          <Image source={noAchievedBucket} style={styles.imageStyle} />
          <Text style={styles.largeText}>열심히 노력해서 
          {"\n"} 버킷을 달성해봐요!</Text>
        </ScrollView>
      );
    }
  };

  const handleWriteBucket = () => {
    navigation.navigate('WriteBucket');
  };

  const handleViewTemplate = () => {
    // sendDataToDB();
    // navigation.navigate('ViewTemplate');
  };

  return (
    <View style={{ flex: 1 }}>
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
