import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/WriteBucketScreen.styles';
import CategoryButton from '../../components/CategoryButton';
import { categories } from '../../data/bucketCategories';


const WriteBucketScreen = ({ bucketInfo, setBucketInfo, sendDataToDB }) => {
  const navigation = useNavigation();

  const handleCategorySelect = (categoryId: string) => {
    setBucketInfo((prevData) => ({ ...prevData, category: categoryId }));
  };

  const validateInputs = () => {
    if (!bucketInfo.title) {
      Alert.alert('입력 오류', '버킷리스트 제목을 입력해주세요.');
      return false;
    }
    if (!bucketInfo.description) {
      Alert.alert('입력 오류', '버킷리스트 설명을 입력해주세요.');
      return false;
    }
    if (!bucketInfo.category) {
      Alert.alert('입력 오류', '카테고리를 선택해주세요.');
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>버킷리스트 작성하기</Text>
            <View style={styles.Dot} />
      </View>
      <Text style={styles.subTitle}>다음은 버킷리스트 작성에 관한 필수 항목입니다.</Text>

      {/* Template Prompt */}
      <View style={styles.templateContainer}>
        <Text style={styles.templateText}>참고할 만한 템플릿이 필요하신가요?</Text>
        <TouchableOpacity style={styles.templateButton}>
          <Text style={styles.templateButtonText}>템플릿 구경하기</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <Text style={styles.sectionTitle}>1. 버킷리스트 제목</Text>
      <TextInput
        style={styles.input}
        placeholder="버킷 리스트 제목"
        onChangeText={(text) => setBucketInfo((prevData) => ({ ...prevData, title: text }))}
      />

      <Text style={styles.sectionTitle}>2. 버킷리스트에 관한 간단한 설명</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="버킷 리스트 설명"
        onChangeText={(text) => setBucketInfo((prevData) => ({ ...prevData, description: text }))}
        multiline={true}
      />

      {/* Category Selection */}
      <Text style={styles.sectionTitle}>3. 카테고리 선택</Text>

      <View style={styles.categoryContainer}>
        {categories.slice(0, -1).map((category, index) => (
          <CategoryButton
            key={category.id}
            icon={category.icon}
            label={category.label}
            borderColor={category.borderColor}
            onPress={() => handleCategorySelect(category.id)}
            isSelected={bucketInfo.category === category.id} // 선택된 경우 스타일 적용
          />
        ))}
      </View>

      {/* Share Toggle */}
      <Text style={styles.sectionTitle}>4. 버킷리스트 공유하기</Text>

      <Switch
        value={bucketInfo.isShared}
        onValueChange={(value) =>
            setBucketInfo((prevData) => ({ ...prevData, isShared: value }))
        }
        style={styles.switch}
      />

      {/* Next Button */}
      <TouchableOpacity
         style={styles.nextButton}
         onPress={handleNextStep}
      >
        <Text style={styles.nextButtonText}>다음 단계</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WriteBucketScreen;
