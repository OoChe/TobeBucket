/*
  NOTICE : 카테고리 별 조회 기능 추가 예정

 [템플릿 목록 조회 스크린]
  - 구성 : 헤더, 템플릿 목록
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ViewTemplateScreen.styles';
import PageTitle from '../../components/PageTitle';
import TemplateBucketShort from '../../components/TemplateBucketShort';

const DUMMY_TEMPLATE_LIST = [
  {
    bucketName: "제주도 한달 살이",
    bucketContent: "재밌당.",
    semiGoalData: [
        { semiGoalTitle: "필요한 돈 모으기" },
        { semiGoalTitle: "구체적인 지역 찾아보기" },
    ],
    category: 2,
  },
  {
    bucketName: "제주도 한달 살이",
    bucketContent: "재밌당.",
    semiGoalData: [
      { semiGoalTitle: "필요한 돈 모으기" },
      { semiGoalTitle: "구체적인 지역 찾아보기" },
      { semiGoalTitle: "숙소 예약하기" },
    ],
    category: 2,
  },
  {
    bucketName: "제주도 한달 살이",
    bucketContent: "재밌당.",
    semiGoalData: [
      { semiGoalTitle: "필요한 돈 모으기" },
    ],
    category: 2,
  },

];


const ViewTemplateScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/icons/backArrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <PageTitle title="템플릿 구경하기" colorCode="#FFCAA4" />
      </View>

      {/* 템플릿 리스트 */}
      <ScrollView contentContainerStyle={styles.container}>
        {DUMMY_TEMPLATE_LIST.map((template, index) => (
          <TemplateBucketShort
            key={index}
            bucketName={template.bucketName}
            bucketContent={template.bucketContent}
            semiGoalCnt={template.semiGoalData.length}
            category={template.category}
            onAddPress={() => navigation.navigate('WriteBucketRequired', { template })}
            onCardPress={() => navigation.navigate('ViewTemplateDetail')}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewTemplateScreen;
