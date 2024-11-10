/*
 [버킷리스트 작성하기(필수) 스크린]
 - 구성 : 헤더, 템플릿 구경하기, 버킷리스트 제목, 설명, 카테고리 선택, 공유 토글, 버튼(다음 단계)
 - 함수
 1) 카테고리 선택
 - handleCategorySelect: 선택된 카테고리를 bucketInfo의 category에 저장

 2) 필수 입력 확인
 - validateInputs: 누락된 필드 확인/Alert 메시지 출력

 3) 제출
 - handleNextStep: bucketInfo를 전송 후 다음 화면 이동
 */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/WriteBucketScreen.styles';
import CategoryButton from '../../components/CategoryButton';
import PageTitle from '../../components/PageTitle';
import { categories } from '../../data/bucketCategories';

const WriteBucketScreen = ({ bucketInfo, setBucketInfo, sendDataToDB }) => {
  const navigation = useNavigation();

  const handleCategorySelect = (categoryId: string) => {
    setBucketInfo((prevData) => ({ ...prevData, category: categoryId }));
  };

  const validateInputs = () => {
    const missingFields = [];

    if (!bucketInfo.bucketName) {
      missingFields.push("제목");
    }
    if (!bucketInfo.bucketContent) {
      missingFields.push("설명");
    }
    if (!bucketInfo.category) {
      missingFields.push("카테고리 선택");
    }

    if (missingFields.length > 0) {
      let errorMsg = missingFields.join(", ");
      if (missingFields.length > 1) {
        const lastCommaIndex = errorMsg.lastIndexOf(", ");
        errorMsg = errorMsg.slice(0, lastCommaIndex) + ", " + errorMsg.slice(lastCommaIndex + 2);
      }
      Alert.alert('입력 오류', `버킷리스트의 ${errorMsg}을 입력해주세요.`);
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
      if (validateInputs()) {
        sendDataToDB();
        navigation.navigate('WriteBucketOptional');
      }
  };


  return (
    <View style={styles.main}>
        {/* 헤더 */}
        <PageTitle title="버킷리스트 작성하기" colorCode="#EE4963" />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.subTitle}>다음은 버킷리스트 작성에 관한 필수 항목입니다.</Text>

          {/* 템플릿 구경하기 */}
          <View style={styles.templateContainer}>
            <Text style={styles.templateText}>참고할 만한 템플릿이 필요하신가요?</Text>
            <TouchableOpacity
              style={styles.templateButton}
              onPress={() => navigation.navigate('ViewTemplate')}
            >
            <Text style={styles.templateButtonText}>템플릿 구경하기</Text>
            </TouchableOpacity>
          </View>

          {/* 버킷리스트 제목 */}
          <Text style={styles.sectionTitle}>1. 버킷리스트 제목</Text>
          <TextInput
            style={styles.input}
            placeholder="버킷 리스트 제목"
            onChangeText={(text) => setBucketInfo((prevData) => ({ ...prevData, bucketName: text }))}
          />

          {/* 버킷리스트 설명 */}
          <Text style={styles.sectionTitle}>2. 버킷리스트에 관한 간단한 설명</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="버킷 리스트 설명"
            onChangeText={(text) => setBucketInfo((prevData) => ({ ...prevData, bucketContent: text }))}
            multiline={true}
          />

          {/* 버킷리스트 카테고리 선택 */}
          <Text style={styles.sectionTitle}>3. 카테고리 선택</Text>
          <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
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

          {/* 버킷리스트 공유 토글 */}
          <Text style={styles.sectionTitle}>4. 버킷리스트 공유하기</Text>

          <Switch
            value={bucketInfo.publicStatus}
            onValueChange={(value) =>
                setBucketInfo((prevData) => ({ ...prevData, publicStatus: value }))
            }
            style={styles.switch}
          />

          {/* 버튼 */}
          <TouchableOpacity
             style={styles.nextButton}
             onPress={handleNextStep}
          >
            <Text style={styles.nextButtonText}>다음 단계</Text>
          </TouchableOpacity>
        </ScrollView>

    </View>
  );
};


export default WriteBucketScreen;
