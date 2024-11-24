/*
 NOTICE : handleDeleteFriend, handleFriendRequest 함수 내에서 삭제 후 리렌더링 설정 필요, Test 필수

 [친구 목록 스크린]
 - 구성 : 헤더, 친구 추가, 친구 목록 (친구 요약, 삭제 드롭 다운)
 - 함수
 1) 친구 삭제
  - confirmDeleteFriend: 삭제 전 재확인
  - handleDeleteFriend: 선택된 친구 삭제 후 요청 전송 (보완 필요)
  - toggleDropdown: 선택된 친구의 삭제 드롭 다운 표시
 */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Alert, Image } from 'react-native';
import styles from '../../styles/FriendListScreen.styles';
import PageTitle from '../../components/PageTitle';
import ListFriendShort from '../../components/ListFriendShort';
import FriendRequest from '../../components/FriendRequest';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFriendList, deleteFriend, respondFriendRequest, Friend, patchFriendList } from '../../apis/friend/friendService';


const DUMMY_USER_ID = "ham"


const FriendListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [friendRequestList, setFriendRequestList] = useState<Friend[]>([]);

  // 친구 목록 가져오기
  useEffect(() => {
    loadFriendList();
  }, []);


  const loadFriendList = async () => {
    try {
      const data = await getFriendList();
      setFriendList(data.friendList);
      setFriendRequestList(data.friendRequest);
    } catch (err: any) {
      console.error('친구 목록 로드 오류:', err);
      setError(err.message || '친구 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };


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
    loadFriendList();
  };

  {/* 친구 요청 */}
  const handleFriendRequest = async (friendId: string, response: number) => {
    const requestBody = {
      friendStatus: response,
      friendId: friendId,
    };
    console.log(requestBody);
    try {
      await patchFriendList(requestBody);
      await loadFriendList();

    } catch (err: any) {
      console.error('친구 요청 전송 오류:', err);
      setError(err.message || '친구 요청을 전송하는 중 오류가 발생했습니다.');
    }
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


      {/* 친구 요청 목록 */}
      {friendRequestList.length > 0 && (
        <View style={styles.friendRequestSection}>
          <Image  source={require('../../assets/icons/requestFriend.png')} style={styles.requestTitle}></Image>
          {friendRequestList.map((friend, index) => (
            <FriendRequest
              key={index}
              friend={friend}
              onAccept={() => handleFriendRequest(friend.userId, 1)}
              onReject={() => handleFriendRequest(friend.userId, 0)}
            />
          ))}
        </View>
      )}


      {/* 친구 목록 리스트 */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* 친구 목록 요약 */}
        {friendList.map((friend, index) => (
          <View key={index} style={styles.friendItem}>
            <ListFriendShort
              profileImage={friend.profileImage}
              mbti={friend.mbti}
              nickname={friend.nickname}
              onMove={() => {
                navigation.navigate('FriendBucket', { userId: friend.userId });
              }}
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
