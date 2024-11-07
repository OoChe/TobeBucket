import React, { useState }from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/WriteBucketOptionalScreen.styles';
import DatePicker from  '../../components/DatePicker';
import { Picker } from '@react-native-picker/picker';


const WriteBucketOptionalScreen = ({ bucketInfo, setBucketInfo, sendDataToDB }) => {
  const [goals, setGoals] = useState<string[]>(['']);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [friendTags, setFriendTags] = useState<string[]>([]);
  const navigation = useNavigation();

  // 목표 추가 함수
  const addGoal = () => {
    const updatedGoals = [...goals, ''];
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, milestones: updatedGoals }));
  };

  // 목표 삭제 함수
  const removeGoal = (index: number) => {
    const updatedGoals = goals.filter((_, idx) => idx !== index);
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, milestones: updatedGoals }));
  };

  // 목표 변경 함수
  const handleGoalChange = (text: string, index: number) => {
    const updatedGoals = goals.map((goal, idx) => (idx === index ? text : goal));
    setGoals(updatedGoals);
    setBucketInfo((prevData) => ({ ...prevData, milestones: updatedGoals }));
  };



  // 친구 추가 함수
  const addFriendTag = () => {
    if (selectedFriend && !friendTags.includes(selectedFriend)) {
      setFriendTags([...friendTags, selectedFriend]);
      setSelectedFriend(null); // 드롭다운 초기화
    }
  };

  // 친구 태그 삭제 함수
  const removeFriendTag = (index: number) => {
    setFriendTags(friendTags.filter((_, idx) => idx !== index));
  };


  const handleNextStep = () => {
     sendDataToDB();
     navigation.navigate('WriteBucketRequired'); // 수정 예정

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>버킷리스트 작성하기</Text>
            <View style={styles.Dot} />
      </View>
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
            setBucketInfo((prevData) => ({ ...prevData, planningDate: date }))
          }
        />
      </View>

      <Text style={styles.sectionTitle}>8. 친구 태그</Text>

      {/* 친구 태그 목록 */}
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

      {/* 친구 추가 드롭다운 */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedFriend}
          onValueChange={(itemValue) => setSelectedFriend(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="친구 추가" value="" />
          <Picker.Item label="햄햄이" value="햄햄이" />
          <Picker.Item label="친구1" value="친구1" />
          <Picker.Item label="친구2" value="친구2" />
          {/* 다른 친구들 추가 */}
        </Picker>
        <TouchableOpacity onPress={addFriendTag} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>


      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextStep}
      >
        <Text style={styles.nextButtonText}>제출 완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default WriteBucketOptionalScreen;
