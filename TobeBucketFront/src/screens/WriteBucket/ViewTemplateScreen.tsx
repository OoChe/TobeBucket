/*
 [템플릿 목록 조회 스크린]
  - 구성 : 헤더, 카테고리 선택 버튼, 템플릿 목록
  1) 템플릿 버킷 가져오기
  - loadTemplates : 서버에서 템플릿 버킷리스트 정보 수신
  2) 카테고리 분류
  - handleCategorySelect : 선택된 카테고리 구분 후 표시
 */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ViewTemplateScreen.styles';
import PageTitle from '../../components/PageTitle';
import TemplateBucketShort from '../../components/TemplateBucketShort';
import { getTemplateBuckets } from '../../apis/bucket/bucketService';
import HorizontalCategory from '../../components/HorizontalCategory';

const ViewTemplateScreen = () => {
  const navigation = useNavigation();
  const [templates, setTemplates] = useState<TemplateBucket[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  {/* 템플릿 버킷 가져오기 */}
  const loadTemplates = async () => {
    try {
      const data = await getTemplateBuckets();
      console.log(data)
      setTemplates(data);
    } catch (err: any) {
      setError(err.message || '템플릿을 불러오는 중 오류가 발생했습니다.');
      Alert.alert('오류', err.message || '템플릿을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  {/* 카테고리 분류 */}
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    console.log(categoryId);
  };
  
  const filteredTemplates = selectedCategory === 6
    ? templates
    : templates.filter(item => item.category === selectedCategory);

  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/icons/backArrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <PageTitle title="템플릿 구경하기" colorCode="#FFCAA4" />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 카테고리 선택 */}
        <HorizontalCategory onSelectCategory={handleCategorySelect}/>

        {/* 템플릿 리스트 */}
        {filteredTemplates.map((template, index) => (
          <TemplateBucketShort
            key={index}
            bucketName={template.bucketName}
            bucketContent={template.bucketContent}
            semiGoalCnt={template.semiGoalData.length}
            category={template.category}
            onAddPress={() => navigation.navigate('WriteBucketRequired', { template })}
            onCardPress={() => navigation.navigate('ViewTemplateDetail', { template })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewTemplateScreen;
