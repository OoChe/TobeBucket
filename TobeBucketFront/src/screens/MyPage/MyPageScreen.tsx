import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/MyPageScreen.styles';
import PageTitle from '../../components/PageTitle';
import MyPageShort from '../../components/MyPageShort';
import AchieveGraph from '../../components/AchieveGraph';
import TopCategory from '../../components/TopCategory';



const DUMMY_MY_INFO = {
    profile: {
       nickname: "iloveham",
       mbti: "ENFP",
       intro: "럭키비키자나",
       profileImage: require('../../assets/images/hamsterProfile.png')
    },
    point: 100,
    achieveRate: 76,
    achieveGraph: [
  	   { year: 2023, first: 2, second: 3 },
  	   { year: 2024, first: 2, second: 5 }
    ],
    categoryRate: [
      { category: 1, rate: 53 },
      { category: 0, rate: 25 },
      { category: 4, rate: 12 }
    ]
};


const MyPageScreen = () => {
   const navigation = useNavigation();
   const profile = DUMMY_MY_INFO.profile;

  return (
    <View style={styles.main}>
      {/* 나의 프로필 정보 */}
      <MyPageShort
        profileImage={DUMMY_MY_INFO.profile.profileImage}
        mbti={DUMMY_MY_INFO.profile.mbti}
        nickname={DUMMY_MY_INFO.profile.nickname}
        intro={DUMMY_MY_INFO.profile.intro}
        onPress= {() => navigation.navigate('ChangeMyInfo', {profile})}
      />

      {/* 나의 포인트, 달성률 */}
      <View style={styles.statsContainer}>
        {/* 포인트 */}
        <View style={styles.statRow}>
          <Text style={styles.statTitle}>나의 포인트</Text>
          <Text style={styles.statValue}>{DUMMY_MY_INFO.point}p</Text>
        </View>

        {/* 달성률 */}
        <View style={styles.statRow}>
          <Text style={styles.statTitle}>나의 버킷 달성률</Text>
          <Text style={styles.statValue}>{DUMMY_MY_INFO.achieveRate}%</Text>
        </View>

        {/* 달성 진척도 */}
        <View style={styles.progressBarContainer}>
          <View
            style={{
              ...styles.progressBarFill,
              width: `${DUMMY_MY_INFO.achieveRate}%`,
            }}
          />
        </View>
      </View>

      {/* 달성 개수 그래프 */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>반기 별 버킷 달성 그래프</Text>
        <AchieveGraph style={styles.graph} data={DUMMY_MY_INFO.achieveGraph} />
      </View>

      {/* MBTI 인기 카테고리 */}
      <View style={styles.mbtiContainer}>
        <Text style={styles.mbtiTitle}>
          <Text style={styles.mbtiHighlight}>{DUMMY_MY_INFO.profile.mbti}</Text> 인기 버킷 카테고리
        </Text>


        <View style={styles.categoryList}>
          {/* 카테고리 아이템들을 수직으로 정렬하기 위한 컨테이너 */}
          <View style={styles.categoryItemsContainer}>
            {DUMMY_MY_INFO.categoryRate.map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                {/* 카테고리 아이콘 */}
                <TopCategory categoryId={item.category} rate={item.rate} />
              </View>
            ))}
          </View>
        
          {/* 버킷 이미지 */}
          <Image
            source={require('../../assets/images/MainBucketImg.png')} // 버킷 이미지 경로
            style={styles.bucketImage}
          />
        </View>
      </View>


    </View>
  );
};

export default MyPageScreen;
