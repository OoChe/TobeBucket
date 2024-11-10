/*
 NOTICE : handleSubmit 함수 내에서 작성 완료 후 이동할 페이지 설정 논의 필요, Test 필수

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

 3) 제출
  - handleSubmit: 입력된 모든 데이터를 확인하여 공백이 아닌 중간 목표만을 bucketInfo에 저장 후 전송
 */

import React, { useState }from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/WriteBucketOptionalScreen.styles';
import DatePicker from  '../../components/DatePicker';
import { Picker } from '@react-native-picker/picker';
import PageTitle from '../../components/PageTitle';

const DUMMY_FRIEND_LIST = ["햄햄일", "햄햄이", "햄햄삼", "햄햄사"];

const WriteBucketOptionalScreen = ({ bucketInfo, setBucketInfo, sendDataToDB }) => {
  const [goals, setGoals] = useState<string[]>(['']);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friendTags, setFriendTags] = useState<string[]>([]);
  const navigation = useNavigation();

  {/* 중간 목표 함수 */}
  const addGoal = () => {
    const updatedGoals = [...goals, ''];
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, semiGoalTitleList: updatedGoals }));
  };

  const removeGoal = (index: number) => {
    const updatedGoals = goals.filter((_, idx) => idx !== index);
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, semiGoalTitleList: updatedGoals }));
  };

  const handleGoalChange = (text: string, index: number) => {
    const updatedGoals = goals.map((goal, idx) => (idx === index ? text : goal));
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, semiGoalTitleList: updatedGoals }));
  };

  {/* 친구 태그 함수 */}
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

  {/* 제출 함수 */}
  const handleSubmit = () => {
     const filteredGoals = goals.filter(goal => goal.trim() !== "");
       setBucketInfo((prevData) => ({
         ...prevData,
         semiGoalTitleList: filteredGoals,
       }));

     sendDataToDB();
     navigation.navigate('WriteBucketRequired'); // 수정 필요
  };

  return (
    <View style = {styles.main}>
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
                 value={goal}
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
            onDateChange={(date) =>
              setBucketInfo((prevData) => ({ ...prevData, goalDate: date }))
            }
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>뒤로 가기</Text>
          </TouchableOpacity>

          {/* 작성 완료 */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>작성 완료</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};


export default WriteBucketOptionalScreen;
