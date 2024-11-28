/*
 [마이페이지 스크린]
 - 구성 : 나의 프로필 정보, 나의 포인트, 달성률, 달성 그래프, 나의 버킷 인기 카테고리
 - 함수
 1) 나의 정보 로드
  - loadMyInfo : 서버에게 요청 받아 나의 정보 수신
 */

import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import styles from '../../styles/MyPageScreen.styles';
import PageTitle from '../../components/PageTitle';
import MyPageShort from '../../components/MyPageShort';
import AchieveGraph from '../../components/AchieveGraph';
import TopCategory from '../../components/TopCategory';
import { getMyInfo } from '../../apis/mypage/mypageService';


const MyPageScreen = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const [profile, setProfile] = useState({
     nickname: '',
     mbti: '',
     intro: '',
     profileImage: '', 
   });
   const [myInfo, setMyInfo] = useState({
     profile: { nickname: '', mbti: '', intro: '', profileImage: '' },
     point: 0,
     achieveRate: 0,
     achieveGraph: [],
     categoryRate: [],
   });

   {/* 내 정보 불러오기 */}
   const loadMyInfo = async () => {
     try {
       const data = await getMyInfo();
       setMyInfo(data);
       setProfile(data.profile);
     } catch (err: any) {
       console.error('마이페이지 내 정보 로드 오류:', err);
       setError(err.message || '마이페이지 내 정보를 불러오는 중 오류가 발생했습니다.');
     }
   };

   useEffect(() => {
     loadMyInfo();
   }, []);

   {/* 내 정보 수정 후 업데이트 된 데이터 반영 */}
   useFocusEffect(
     React.useCallback(() => {
       if (route.params?.updatedProfile) {
         const updatedProfile = route.params.updatedProfile;
         setProfile((prev) => ({ ...prev, ...updatedProfile }));
         setMyInfo((prev) => ({
           ...prev,
           profile: { ...prev.profile, ...updatedProfile },
         }));
       } else {
         loadMyInfo();
       }
     }, [route.params])
   );


  return (
    <ScrollView style={styles.main}>
      {/* 나의 프로필 정보 */}
      <MyPageShort
        profileImage={myInfo.profile.profileImage}
        mbti={myInfo.profile.mbti}
        nickname={myInfo.profile.nickname}
        intro={myInfo.profile.intro}
        onPress= {() => navigation.navigate('ChangeMyInfo', {profile})}
      />

      {/* 나의 포인트, 달성률 */}
      <View style={styles.statsContainer}>
        {/* 포인트 */}
        <View style={styles.statRow}>
          <Text style={styles.statTitle}>나의 포인트</Text>
          <Text style={styles.statValue}>{myInfo.point}p</Text>
        </View>

        {/* 달성률 */}
        <View style={styles.statRow}>
          <Text style={styles.statTitle}>나의 버킷 달성률</Text>
          <Text style={styles.statValue}>{myInfo.achieveRate}%</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View
            style={{
              ...styles.progressBarFill,
              width: `${myInfo.achieveRate}%`,
            }}
          />
        </View>
      </View>

      {/* 달성 그래프 */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>반기 별 버킷 달성 그래프</Text>
        {myInfo.achieveGraph.length > 0 ? (
          <AchieveGraph style={styles.graph} data={myInfo.achieveGraph} />
        ) : (
          <Text style={styles.noGraphText}>달성 데이터가 없습니다.</Text>
        )}
      </View>

      {/* 나의 버킷 인기 카테고리 */}
      <View style={styles.mbtiContainer}>
        <Text style={styles.mbtiTitle}>
          나의 버킷 인기 카테고리
        </Text>
        <View style={styles.categoryList}>
          <View style={styles.categoryItemsContainer}>
            {myInfo.categoryRate.map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                <TopCategory categoryId={item.category} rate={item.rate} />
              </View>
            ))}
          </View>
        
          {/* 버킷 이미지 */}
          <Image
            source={require('../../assets/images/MainBucketImg.png')}
            style={styles.bucketImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;
