/*
 [버킷리스트 수정하기 스크린]
 - 구성 : 헤더, 중간 목표, 달성 날짜, 친구 태그 입력, 버튼(뒤로, 작성 완료)
 - 함수
 1) 중간 목표
  - addGoal: 새로운 빈 중간 목표를 추가/semiGoalTitleList 업데이트
  - removeGoal: 선택한 중간 목표를 삭제/ semiGoalTitleList 업데이트
  - handleGoalChange: 중간 목표 변경 시 semiGoalTitleList 업데이트

 2) 친구 태그
  - handleFriendSelect: selectedFriends에 추가/제거
  - confirmFriendSelection: friendTags 배열 추가/friendNickNameList 업데이트
  - removeFriendTag: 친구 태그 삭제
  - openFriendPicker: friendPicker 모달 열기/선택된 친구 목록 초기 값 설정

 3) 목표 달성 날짜 선택 :
  - handleDateChange: 목표 달성 날짜 설정 시 dateString으로 저장

 4) 제출
  - handleSubmit: 입력된 모든 데이터를 확인하여 공백이 아닌 중간 목표만을 bucketInfo에 저장 후 전송
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Switch,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/EditBucketScreen.styles';
import PageTitle from '../../components/PageTitle';
import CategoryButton from '../../components/CategoryButton';
import {categories} from '../../data/bucketCategories';
import {
  getEditBucketDetail,
  submitEditData,
} from '../../apis/bucket/bucketService';
import {BucketDetail, EditBucketSubmit} from '../../apis/types';

const EditMyBucketScreen = () => {
  const route = useRoute();
  const {bucketId} = route.params as {bucketId: number};

  // BucketDetail 초기값 설정
  const initialBucketDetail: BucketDetail = {
    bucketId: 0,
    bucketName: '',
    bucketContent: '',
    goalDate: '',
    category: 0,
    createDate: '',
    achievementDate: '',
    friendNickname: [],
    semiGoalData: new Map(),
    goalReview: '',
    achievementMedia: '',
    stickerId: 0,
    publicStatus: false,
  };

  const [bucketList, setBucketList] =
    useState<BucketDetail>(initialBucketDetail);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [friendTags, setFriendTags] = useState<string[]>([]);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const navigation = useNavigation();

  // 카테고리 선택 함수
  const handleCategorySelect = (categoryId: string) => {
    setBucketList(prevData => ({...prevData, category: categoryId}));
  };

  // 친구 태그 함수
  const handleFriendSelect = (friend: string) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter(f => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const confirmFriendSelection = () => {
    const newFriends = [
      ...friendTags,
      ...selectedFriends.filter(f => !friendTags.includes(f)),
    ];
    setFriendTags(newFriends);
    setBucketList(prevData => ({...prevData, friendNickNameList: newFriends}));
    setShowFriendPicker(false);
  };

  const removeFriendTag = (index: number) => {
    const updatedFriends = friendTags.filter((_, idx) => idx !== index);
    setFriendTags(updatedFriends);
    setBucketList(prevData => ({
      ...prevData,
      friendNickNameList: updatedFriends,
    }));
  };

  const openFriendPicker = () => {
    setSelectedFriends(friendTags);
    console.log('선택했어요');
    setShowFriendPicker(true);
  };
  // 제출 함수
  const handleSubmit = async () => {
    const finalBucketInfo: EditBucketSubmit = {
      bucketContent: bucketList.bucketContent,
      category: bucketList.category,
      publicStatus: bucketList.publicStatus,
    };
    try {
      const response = await submitEditData(finalBucketInfo, bucketId);
      Alert.alert('성공', '버킷리스트가 성공적으로 수정되었습니다.');
      navigation.navigate('MyBucketDetail', {bucketId: bucketId}); // 이전 화면으로 돌아가기
    } catch (error: any) {
      console.error('버킷 수정 오류:', error);
      const errorMessage =
        error.response?.data?.message ||
        '버킷리스트 수정 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  const getEditBucket = async () => {
    try {
      const data = await getEditBucketDetail(bucketId);
      setBucketList(data.bucketListDetail);
      setSelectedFriends(data.bucketListDetail.friendNickname);
    } catch (err: any) {
      console.error('달성 예정 로드 오류:', err);
      setError(
        err.message ||
          '스크린에서 버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
  };
  useEffect(() => {
    getEditBucket();
  }, []);
  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <PageTitle title="버킷리스트 수정하기" colorCode="#EE4963" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>
          1. 버킷리스트에 관한 간단한 설명
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="버킷 리스트 설명"
          value={bucketList.bucketContent}
          onChangeText={text =>
            setBucketList(prevData => ({...prevData, bucketContent: text}))
          }
          multiline={true}
        />

        <Text style={styles.sectionTitle}>2. 카테고리 선택</Text>
        <View style={styles.categoryContainer}>
          {categories.map(
            (category, index) =>
              category.id !== 6 && (
                <CategoryButton
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  borderColor={category.borderColor}
                  onPress={() => handleCategorySelect(category.id)}
                  isSelected={bucketList.category === category.id}
                />
              ),
          )}
        </View>

        <Text style={styles.sectionTitle}>3. 버킷리스트 공유하기</Text>
        <Switch
          value={bucketList.publicStatus}
          onValueChange={value =>
            setBucketList(prevData => ({...prevData, publicStatus: value}))
          }
          style={styles.switch}
        />
        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          {/* 뒤로 가기 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>뒤로 가기</Text>
          </TouchableOpacity>

          {/* 수정 완료 */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>수정 완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditMyBucketScreen;
