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

const DUMMY_FRIEND_LIST = ['햄햄일', '햄햄이', '햄햄삼', '햄햄사'];
const EditMyBucketScreen = ({sendDataToDB}) => {
  const route = useRoute();
  const {bucketInfo} = route.params;

  const [goals, setGoals] = useState(bucketInfo.semiGoalData || []);
  const [selectedFriends, setSelectedFriends] = useState<string[]>(
    bucketInfo.friendIds.map(friend => friend.name),
  );
  const [friendTags, setFriendTags] = useState<string[]>(
    bucketInfo.friendIds.map(friend => friend.name),
  );
  const navigation = useNavigation();
  // 카테고리 선택 함수
  const handleCategorySelect = (categoryId: string) => {
    setBucketInfo(prevData => ({...prevData, category: categoryId}));
  };
  // 중간 목표 함수
  const addGoal = () => {
    const updatedGoals = [...goals, {semiGoalTitle: ''}];
    setGoals(updatedGoals);
    setBucketInfo(prevData => ({...prevData, semiGoalData: updatedGoals}));
  };

  const removeGoal = (index: number) => {
    const updatedGoals = goals.filter((_, idx) => idx !== index);
    setGoals(updatedGoals);
    setBucketInfo(prevData => ({...prevData, semiGoalData: updatedGoals}));
  };

  const handleGoalChange = (text: string, index: number) => {
    const updatedGoals = goals.map((goal, idx) =>
      idx === index ? {semiGoalTitle: text} : goal,
    );
    setGoals(updatedGoals);
    setBucketInfo(prevData => ({...prevData, semiGoalData: updatedGoals}));
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
    setSelectedFriends([]);
    setBucketInfo(prevData => ({...prevData, friendNickNameList: newFriends}));
    setShowFriendPicker(false);
  };

  const removeFriendTag = (index: number) => {
    const updatedFriends = friendTags.filter((_, idx) => idx !== index);
    setFriendTags(updatedFriends);
    setBucketInfo(prevData => ({
      ...prevData,
      friendNickNameList: updatedFriends,
    }));
  };

  const openFriendPicker = () => {
    setSelectedFriends(friendTags);
    setShowFriendPicker(true);
  };
  // 제출 함수
  const handleSubmit = () => {
    const filteredGoals = goals.filter(
      goal => goal.semiGoalTitle.trim() !== '',
    );
    const updatedBucketInfo = {
      ...bucketInfo,
      semiGoalData: filteredGoals,
    };
    setBucketInfo(updatedBucketInfo);
    sendDataToDB(updatedBucketInfo); // 수정된 bucketInfo를 서버로 전송
    navigation.navigate('MyBucketDetail'); // 이전 화면으로 돌아가기
  };

  useEffect(() => {
    // 서버에서 bucketID를 사용하여 데이터 요청
    // fetch(`/buckets/${bucketId}`)
    //   .then(response => response.json())
    //   .then(data => setBucketDetail(data))
    //   .catch(error => console.error('Error fetching bucket detail:', error));
    // 서버 적용 시 아래 내용 삭제
    console.log('받아온 bucketInfo: ', bucketInfo);
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
          value={bucketInfo.bucketContent}
          onChangeText={text =>
            setBucketInfo(prevData => ({...prevData, bucketContent: text}))
          }
          multiline={true}
        />

        <Text style={styles.sectionTitle}>2. 카테고리 선택</Text>
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

        <Text style={styles.sectionTitle}>3. 버킷리스트 공유하기</Text>
        <Switch
          value={bucketInfo.publicStatus}
          onValueChange={value =>
            setBucketInfo(prevData => ({...prevData, publicStatus: value}))
          }
          style={styles.switch}
        />
        {/* 중간 목표 설정 */}
        <Text style={styles.sectionTitle}>4. 버킷리스트 중간 목표 설정</Text>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalContainer}>
            <TouchableOpacity
              onPress={() => removeGoal(index)}
              style={styles.removeButton}>
              <Text style={styles.removeButtonText}>ㅡ</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.goalInput}
              placeholder="중간 목표 입력"
              value={goal.semiGoalTitle}
              onChangeText={text => handleGoalChange(text, index)}
            />
          </View>
        ))}

        <TouchableOpacity onPress={addGoal} style={styles.addButton}>
          <Text style={styles.addButtonText}> + 단계 별 중간 목표</Text>
        </TouchableOpacity>

        {/* 친구 태그 목록 */}
        <Text style={styles.sectionTitle}>5. 친구 태그</Text>
        {friendTags.length > 0 && (
          <View style={styles.friendTagsContainer}>
            {friendTags.map((friend, index) => (
              <View key={index} style={styles.friendTag}>
                <Text style={styles.friendTagText}>@{friend}</Text>
                <TouchableOpacity
                  onPress={() => removeFriendTag(index)}
                  style={styles.removeTagButton}>
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

        <Modal
          visible={showFriendPicker}
          transparent={true}
          animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>친구 선택</Text>
              {DUMMY_FRIEND_LIST.map(friend => (
                <TouchableOpacity
                  key={friend}
                  onPress={() => handleFriendSelect(friend)}
                  style={[
                    styles.friendItem,
                    selectedFriends.includes(friend) &&
                      styles.selectedFriendItem,
                  ]}>
                  <Text style={styles.friendItemText}>{friend}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={confirmFriendSelection}
                style={styles.confirmButton}>
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
            onPress={() => navigation.goBack()}>
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

export default EditMyBucketScreen;
