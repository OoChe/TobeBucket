/*
 NOTICE : handleDeleteFriend 함수 내에서 삭제 후 리렌더링 설정 필요, Test 필수

 [친구 목록 스크린]
 - 구성 : 헤더, 친구 추가, 친구 목록 (친구 요약, 삭제 드롭 다운)
 - 함수
 1) 친구 삭제
  - confirmDeleteFriend: 삭제 전 재확인
  - handleDeleteFriend: 선택된 친구 삭제 후 요청 전송 (보완 필요)
  - toggleDropdown: 선택된 친구의 삭제 드롭 다운 표시
 */

import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import styles from '../../styles/FriendListScreen.styles';
import PageTitle from '../../components/PageTitle';
import ListFriendShort from '../../components/ListFriendShort';
import { useNavigation } from '@react-navigation/native';

interface Friend {
  userId: string;
  nickname: string;
  mbti: string;
  profileImage: any;
}

const DUMMY_FRIEND_LIST: Friend[] = [
  {
    userId: "ham1",
    nickname: "햄햄일",
    mbti: "ENTP",
    profileImage: require('../../assets/images/hamsterProfile.png'),
  },
  {
    userId: "ham2",
    nickname: "햄햄이",
    mbti: "ENTJ",
    profileImage: require('../../assets/images/hamsterProfile.png'),
  },
];

const FriendListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

  {/* 친구 삭제 전 확인 창 */}
  const confirmDeleteFriend = (id: string) => {
    Alert.alert(
      "친구 삭제",
      "정말로 친구를 삭제하시겠습니까?",
      [
        {
          text: "확인",
          onPress: () => handleDeleteFriend(id),
          style: "destructive",
        },
        {
          text: "취소",
          onPress: () => console.log("삭제 취소됨"),
          style: "cancel",
        },
      ]
    );
  };

  {/* 친구 삭제 */}
  const handleDeleteFriend = (id: string) => {
    const requestBody = {
      userId: id,
    };

    console.log(requestBody);
    console.log(`${id}을(를) 삭제합니다.`);
    setDropdownVisible(null);
  };

  {/* 친구 삭제 드롭 다운 표시 */}
  const toggleDropdown = (userId: string) => {
    setDropdownVisible((prev) => (prev === userId ? null : userId));
  };

  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <PageTitle title="친구 목록" colorCode="#88B9FF" />
      </View>

      {/* 친구 추가 버튼 */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={( )=> navigation.navigate('SearchFriend')}>
          <Text style={styles.addButtonText}>친구 추가</Text>
        </TouchableOpacity>
      </View>

      {/* 친구 목록 리스트 */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* 친구 목록 요약 */}
        {DUMMY_FRIEND_LIST.map((friend, index) => (
          <View key={index} style={styles.friendItem}>
            <ListFriendShort
              profileImage={friend.profileImage}
              mbti={friend.mbti}
              nickname={friend.nickname}
              onMove={() => navigation.navigate('FriendBucket')}
              onDrop={() => toggleDropdown(friend.userId)}
            />
            {/* 친구 삭제 드롭 다운 */}
            {dropdownVisible === friend.userId && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  onPress={() => confirmDeleteFriend(friend.userId)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>친구 삭제하기</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendListScreen;
