/*
 [내 버킷리스트 보기(달성 예정) 스크린]
 - 구성 : 헤더, 템플릿 구경하기, 버킷리스트 제목, 설명, 카테고리 선택, 공유 토글, 버튼(다음 단계)
 - 함수
 1) 카테고리 선택
 - handleCategorySelect: 선택된 카테고리를 bucketInfo의 category에 저장

 2) 필수 입력 확인
 - validateInputs: 누락된 필드 확인/Alert 메시지 출력

 3) 제출
 - handleNextStep: bucketInfo를 전송 후 다음 화면 이동
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import ViewMyBucketToggle from '../../components/ViewMyBucketToggle';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import CategoryButton from '../../components/CategoryButton';
import MyBucketShort from '../../components/MyBucketShort.tsx';
import {categories} from '../../data/bucketCategories';
import CryingBucket from '../../assets/images/cryingBucketImg.png';
import styles from '../../styles/MyBucketScreen.styles';

// 임시 데이터 생성
const unachievedData = [
  {
    bucketId: 1,
    bucketName: '제주도 일 년 살이',
    bucketContent: '제주도에서 일 년 동안 살며 힐링하기',
    goalDate: '2024-12-31',
    category: 2,
  },
  {
    bucketId: 2,
    bucketName: '베이킹 배우기',
    bucketContent: '롤케이크 직접 만들어보기',
    goalDate: '2024-11-31',
    category: 5,
  },
];

const achievedData = [
  {
    bucketId: 1,
    bucketName: '제주도 한 달 살이',
    achieveDate: '2022-01-01',
    category: 2,
    achievementMedia: '',
    recordContent: '제주도에서 한달 동안 힐링하기 성공했다',
  },
  {
    bucketId: 2,
    bucketName: '요리 배우기',
    achieveDate: '2024-11-31',
    category: 5,
    achievementMedia: '',
    recordContent: '제주도에서 한달 동안 힐링하기 성공했다',
  },
];

// Toggle의 상태(달성 예정/달성 완료)에 따라 화면 변경 구현
const MyBucketScreen = () => {
  const [bucketList, setBucketList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('upcoming'); // 'upcoming' or 'achieved'

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
      // if (viewMode == 'upcoming') setBucketList(unachievedData);
      // else setBucketList(achievedData);
      setLoading(false);
    };

    fetchBucketList();
  }, []);

  const handleCategorySelect = (categoryId: string) => {};

  return (
    <SafeAreaView>
      <PageTitle title="나의 버킷" colorCode="#B6E7CC" />
      <ViewMyBucketToggle onSelect={setViewMode} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e6969" />
        </View>
      ) : bucketList && bucketList.length > 0 ? (
        <View style={styles.bucketListContainer}>
          <ScrollView
            style={styles.categoryContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false} // 스크롤바 표시 여부
          >
            {[categories[6], ...categories.slice(0, 6)].map(
              (category, index) => (
                <CategoryButton
                  icon={category.icon}
                  label={category.label}
                  borderColor={category.borderColor}
                  onPress={() => handleCategorySelect(category.id)}
                  isSelected={false} // 선택된 경우 스타일 적용 bucketInfo.category === category.id
                />
              ),
            )}
          </ScrollView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {bucketList.map(item => (
              <MyBucketShort
                key={item.id}
                title={item.bucketName}
                description={item.bucketContent}
                date={item.goalDate}
                category={item.category}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.smallText}>아직 작성한 버킷이 없어요</Text>
          <Image source={CryingBucket} style={styles.imageStyle} />
          <Text style={styles.largeText}>버킷을 작성하러 가볼까요?</Text>
          <CustomButton
            text="버킷 작성하러가기"
            colorCode="#1e6969"
            filled={true}
          />
          <CustomButton
            text="템플릿 구경하기"
            colorCode="#1e6969"
            filled={false}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyBucketScreen;
