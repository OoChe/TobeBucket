import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import ViewMyBucketToggle from '../../components/ViewMyBucketToggle.tsx';
import PageTitle from '../../components/PageTitle.tsx';
import CustomButton from '../../components/CustomButton.tsx';
import CryingBucket from '../../assets/images/CryingBucketImg.png';
import styles from '../../styles/MyBucketScreen.styles.ts';

// Toggle의 상태(달성 예정/달성 완료)에 따라 화면 변경 구현
// 작성한 버킷이 존재할 경우, 존재하는 버킷 리스트를 표시
const MyBucketScreen = () => {
  const [bucketList, setBucketList] = useState(null); // 초기값 null로 설정하여 로딩 상태 구분
  const [loading, setLoading] = useState(true);

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
      // 임시 데이터 생성
      const mockData = [
        {id: 1, title: '여행 가기', completed: false},
        {id: 2, title: '요리 배우기', completed: true},
        // 필요한 만큼 데이터 추가
      ];

      // 데이터를 임의로 가져온 것처럼 설정
      setBucketList(mockData);
      setLoading(false);
    };

    fetchBucketList();
  }, []);

  return (
    <SafeAreaView>
      <PageTitle title="나의 버킷" colorCode="#B6E7CC" />
      <ViewMyBucketToggle />

      {loading ? (
        // 로딩 중 스피너 표시
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e6969" />
        </View>
      ) : bucketList && bucketList.length > 0 ? (
        // 버킷리스트 데이터가 있을 때의 화면
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {bucketList.map(item => (
            <Text key={item.id} style={styles.smallText}>
              {item.title} - {item.completed ? '완료' : '미완료'}
            </Text>
          ))}
        </ScrollView>
      ) : (
        // 버킷리스트 데이터가 없을 때의 화면
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.smallText}>아직 작성한 버킷이 없어요</Text>
          <Image source={CryingBucket} style={styles.imageStyle} />
          <Text style={styles.largeText}>버킷을 작성하러 가볼까요?</Text>
          <CustomButton
            text="버킷 작성하러가기"
            color="#1e6969"
            filled={true}
          />
          <CustomButton text="템플릿 구경하기" color="#1e6969" filled={false} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyBucketScreen;
