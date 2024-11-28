/*
 [버킷리스트 작성하기(필수) 스크린]
 - 구성 : 헤더, 템플릿 구경하기, 버킷리스트 제목, 설명, 카테고리 선택, 공유 토글, 버튼(다음 단계)
 - 함수
 1) 템플릿 업데이트
 - useEffect 내 로직: 전달된 템플릿이 존재하는 경우, 입력 값에 업데이트
 2) 카테고리 선택
 - handleCategorySelect: 선택된 카테고리를 bucketInfo의 category에 저장
 2) 필수 입력 확인
 - validateInputs: 누락된 필드 확인/Alert 메시지 출력
 3) 제출
 - handleNextStep: bucketInfo를 전송 후 다음 화면 이동
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/WriteBucketScreen.styles';
import CategoryButton from '../../components/CategoryButton';
import PageTitle from '../../components/PageTitle';
import { categories } from '../../data/bucketCategories';


const WriteBucketScreen = ({ bucketInfo, setBucketInfo }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const template = route.params?.template;

  useEffect(() => {
   {/* 템플릿이 전달된 경우, 입력 값 전달 */}

    if (template) {
      console.log('템플릿 가져오기 성공:', template);
      setBucketInfo((prevData) => ({
        ...prevData,
        bucketName: template.bucketName,
        bucketContent: template.bucketContent,
        category: template.category,
        semiGoalData: template.semiGoalData,
        goalDate: template.goalDate
          ? new Date(template.goalDate).toISOString().split("T")[0]
          : null,
      }));
      navigation.setParams({ template: null });
    }
  }, [template, setBucketInfo, navigation]);


  {/* 카테고리 선택 함수 */}
  const handleCategorySelect = (categoryId: string) => {
    setBucketInfo((prevData) => ({ ...prevData, category: categoryId }));
  };

  {/* 필수 항목 입력 확인 및 예외 처리 */}
  const validateInputs = () => {
    const missingFields = [];
    console.log(bucketInfo);
    if (!bucketInfo.bucketName) missingFields.push("제목");
    if (!bucketInfo.bucketContent) missingFields.push("설명");
    if (bucketInfo.category === null || bucketInfo.category === undefined) {
      missingFields.push("카테고리 선택");
    }
    if (missingFields.length > 0) {
      const errorMsg = missingFields.join(", ").replace(/,([^,]*)$/, " 및$1");
      Alert.alert('입력 오류', `버킷리스트의 ${errorMsg}을 입력해주세요.`);
      return false;
    }
    return true;
  };

  {/* 다음 단계로 이동 */}
  const handleNextStep = () => {
    if (validateInputs()) {
      navigation.navigate('WriteBucketOptional', { bucketInfo });
    }
  };

  return (
    <View style={styles.main}>
      <PageTitle title="버킷리스트 작성하기" colorCode="#EE4963" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subTitle}>다음은 버킷리스트 작성에 관한 필수 항목입니다.</Text>

        <View style={styles.templateContainer}>
          <Text style={styles.templateText}>참고할 만한 템플릿이 필요하신가요?</Text>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => navigation.navigate('ViewTemplate')}
          >
            <Text style={styles.templateButtonText}>템플릿 구경하기</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>1. 버킷리스트 제목</Text>
        <TextInput
          style={styles.input}
          placeholder="버킷 리스트 제목"
          value={bucketInfo.bucketName}
          onChangeText={(text) => setBucketInfo((prevData) => ({ ...prevData, bucketName: text }))}
        />

        <Text style={styles.sectionTitle}>2. 버킷리스트에 관한 간단한 설명</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="버킷 리스트 설명"
          value={bucketInfo.bucketContent}
          onChangeText={(text) => setBucketInfo((prevData) => ({ ...prevData, bucketContent: text }))}
          multiline={true}
        />

        <Text style={styles.sectionTitle}>3. 카테고리 선택</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            category.id !== 6 &&
            <CategoryButton
              key={category.id}
              icon={category.icon}
              label={category.label}
              borderColor={category.borderColor}
              onPress={() => handleCategorySelect(category.id)}
              isSelected={bucketInfo.category === category.id}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>4. 버킷리스트 공유하기</Text>
        <Switch
          value={bucketInfo.publicStatus}
          onValueChange={(value) =>
            setBucketInfo((prevData) => ({ ...prevData, publicStatus: value }))
          }
          style={styles.switch}
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>다음 단계</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default WriteBucketScreen;
