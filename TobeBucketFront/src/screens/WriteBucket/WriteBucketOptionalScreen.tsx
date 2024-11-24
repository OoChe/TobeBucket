/*
 NOTICE : Test 필수
 [UPDATE]
 24.11.13 - 달성 날짜 형식 변경(YY-MM-DD 문자열), 이전 날짜 선택 불가
 24.11.23 - 작성 완료 후 나의 버킷 페이지로 이동 설정

 [버킷리스트 작성하기(선택) 스크린]
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

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/WriteBucketOptionalScreen.styles';
import DatePicker from '../../components/DatePicker';
import PageTitle from '../../components/PageTitle';
import { writeBucket, getFriendNickNames } from '../../apis/bucket/bucketService';

const DUMMY_FRIEND_LIST = ["햄햄일", "햄햄이", "햄햄삼", "햄햄사"];

const WriteBucketOptionalScreen = ({ route, bucketInfo, setBucketInfo }) => {
  const initialBucketInfo = route.params?.bucketInfo || bucketInfo;
  const [goals, setGoals] = useState(initialBucketInfo.semiGoalData || []);
  const [friendList, setFriendList] = useState<string[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friendTags, setFriendTags] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFriendList = async () => {
      try {
        const friends = await getFriendNickNames();
        setFriendList(friends);
      } catch (error: any) {
        console.error('친구 목록 로드 오류:', error);
        Alert.alert('오류', error.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
      }
    };

    loadFriendList();
  }, []);



  // 중간 목표 함수
  const addGoal = () => {
    const updatedGoals = [...goals, { semiGoalTitle: '' }];
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, semiGoalData: updatedGoals }));
  };

  const removeGoal = (index: number) => {
    const updatedGoals = goals.filter((_, idx) => idx !== index);
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, semiGoalData: updatedGoals }));
  };

  const handleGoalChange = (text: string, index: number) => {
    const updatedGoals = goals.map((goal, idx) =>
      idx === index ? { semiGoalTitle: text } : goal
    );
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, semiGoalData: updatedGoals }));
  };

  // 친구 태그 함수
  const handleFriendSelect = (friend: string) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter((f) => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const confirmFriendSelection = () => {
    const newFriends = [...friendTags, ...selectedFriends.filter((f) => !friendTags.includes(f))];
    setFriendTags(newFriends);
    setSelectedFriends([]);
    setBucketInfo((prevData) => ({ ...prevData, friendNickNameList: newFriends }));
    setShowFriendPicker(false);
  };

  const removeFriendTag = (index: number) => {
    const updatedFriends = friendTags.filter((_, idx) => idx !== index);
    setFriendTags(updatedFriends);
    setBucketInfo((prevData) => ({ ...prevData, friendNickNameList: updatedFriends }));
  };

  const openFriendPicker = () => {
    setSelectedFriends(friendTags);
    setShowFriendPicker(true);
  };

  // 목표 달성 날짜 선택
  const handleDateChange = (date) => {
    const dateString = date.toISOString().split("T")[0];
    setBucketInfo((prevData) => ({ ...prevData, goalDate: dateString }));
  };

  // 제출 함수
  const handleSubmit = async () => {
    // 중간 목표 필터링
    const filteredGoals = goals.filter((goal) => goal.semiGoalTitle.trim() !== '');
    const finalBucketInfo: WriteBucketRequest = {
      bucketName: bucketInfo.bucketName || bucketInfo.title,
      bucketContent: bucketInfo.bucketContent || bucketInfo.description,
      category: bucketInfo.category,
      publicStatus: bucketInfo.publicStatus,
      createDate: new Date().toISOString().split('T')[0],
      goalDate: bucketInfo.goalDate,
      friendNickNameList: friendTags,
      semiGoalData: filteredGoals,
    };

    // 데이터 확인을 위한 로그 출력
    console.log('최종 버킷 데이터:', JSON.stringify(finalBucketInfo, null, 2));

    try {
      // 버킷 생성 API 호출
      //const response = await writeBucket(finalBucketInfo);
      Alert.alert('성공', '버킷리스트가 성공적으로 생성되었습니다.');
      navigation.navigate('MyBucket', {screen : 'MyBucketList'});
    } catch (error: any) {
      console.error('버킷 생성 오류:', error);
      const errorMessage = error.response?.data?.message || '버킷리스트 생성 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <PageTitle title="버킷리스트 작성하기" colorCode="#EE4963" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subTitle}>다음은 버킷리스트 작성에 관한 선택 항목입니다.</Text>

        {/* 중간 목표 설정 */}
        <Text style={styles.sectionTitle}>6. 버킷리스트 중간 목표 설정</Text>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalContainer}>
            <TouchableOpacity onPress={() => removeGoal(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>ㅡ</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.goalInput}
              placeholder="중간 목표 입력"
              value={goal.semiGoalTitle}
              onChangeText={(text) => handleGoalChange(text, index)}
            />
          </View>
        ))}

        <TouchableOpacity onPress={addGoal} style={styles.addButton}>
          <Text style={styles.addButtonText}> + 단계 별 중간 목표</Text>
        </TouchableOpacity>

        {/* 목표 달성 날짜 선택 */}
        <View style={styles.dateSectionContainer}>
          <Text style={styles.sectionTitle}>7. 목표 달성 날짜 선택</Text>
          <DatePicker
            onDateChange={handleDateChange}
          />
        </View>

        {/* 친구 태그 목록 */}
        <Text style={styles.sectionTitle}>8. 친구 태그</Text>
        {friendTags.length > 0 && (
          <View style={styles.friendTagsContainer}>
            {friendTags.map((friend, index) => (
              <View key={index} style={styles.friendTag}>
                <Text style={styles.friendTagText}>@{friend}</Text>
                <TouchableOpacity onPress={() => removeFriendTag(index)} style={styles.removeTagButton}>
                  <Text style={styles.removeTagText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* 친구 추가 모달 */}
        <TouchableOpacity onPress={openFriendPicker} style={styles.addButton}>
          <Text style={styles.addButtonText}>친구 추가</Text>
        </TouchableOpacity>

        <Modal visible={showFriendPicker} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>친구 선택</Text>
              {DUMMY_FRIEND_LIST.map((friend) => (
                <TouchableOpacity
                  key={friend}
                  onPress={() => handleFriendSelect(friend)}
                  style={[
                    styles.friendItem,
                    selectedFriends.includes(friend) && styles.selectedFriendItem,
                  ]}
                >
                  <Text style={styles.friendItemText}>{friend}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={confirmFriendSelection} style={styles.confirmButton}>
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          {/* 뒤로 가기 */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>뒤로 가기</Text>
          </TouchableOpacity>

          {/* 작성 완료 */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>작성 완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default WriteBucketOptionalScreen;