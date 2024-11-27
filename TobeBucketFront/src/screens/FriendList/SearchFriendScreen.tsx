/*
 [친구 검색 스크린]
 - 구성 : 헤더, 검색 안내 문구, 검색 입력, 친구 목록
 - 함수
 1) 친구 신청 함수
 - handleAddFriend: 선택된 친구 신청 전송 (보완 필요)
 2) 친구 목록 렌더링 함수
 - renderFriendItem: 자기와 친구가 아닌 친구 리스트 출력
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import styles from '../../styles/SearchFriendScreen.styles';
import SearchFriendShort from '../../components/SearchFriendShort';
import { useRoute } from '@react-navigation/native';
import { Friend, addFriend } from '../../apis/friend/friendService';

const SearchFriendScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState<string>('');
  const [requestedFriends, setRequestedFriends] = useState<string[]>([]);
  const route = useRoute();
  const { userData = [] } = route.params as { userData: Friend[] | [] };
  const filteredFriends = userData.filter((friend) =>
    friend.userId.toLowerCase().includes(searchText.toLowerCase())
  );

  {/* 친구 신청 함수 */}
  const handleAddFriend = async (id: string) => {
    const requestBody = {
        friendId: id,
    };
    try {
      await addFriend(requestBody);
      setRequestedFriends((prev) => [...prev, id]);
      Alert.alert(
        "친구 신청 완료",
        `${id}에게 친구 신청을 보냈습니다.`,
        [{ text: "확인", onPress: () => console.log("확인 버튼 눌림") }]
      );
    } catch (err: any) {
      console.error('친구 추가하기 오류:', err);
      setError(err.message || '친구를 추가하는 중 오류가 발생했습니다.');
    }
    Alert.alert(
      "친구 신청 완료",
      `${id}에게 친구 신청을 보냈습니다.`,
      [{ text: "확인", onPress: () => console.log("확인 버튼 눌림") }]
    );
  };

  {/* 친구 목록 렌더링 */}
  const renderFriendItem = ({ item, index }: { item: typeof userData[0] }) => {
    const isRequested = requestedFriends.includes(item.userId);

    return (
      <SearchFriendShort
        key={index}
        profileImage={item.profileImage}
        mbti={item.mbti}
        nickname={item.nickname}
        onAdd={() => handleAddFriend(item.userId)}
        isRequested={isRequested}
      />
    );
  };

  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/icons/backArrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>뒤로 가기</Text>
      </View>

      {/* 검색 안내 문구 */}
      <View style={styles.searchTitleContainer}>
        <View style={styles.circleLeft} />
        <Text style={styles.searchTitle}>친구를 찾아볼까요?</Text>
        <View style={styles.circleRight} />
      </View>

      {/* 검색 입력 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="친구 ID 검색"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity>
          <Image source={require('../../assets/icons/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* 친구 목록 */}
      {userData.length > 0 ? (
      <FlatList
        data={filteredFriends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.friendList}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
        } />) :  (
      <View style={styles.noFriendsContainer}>
          <Text style={styles.noFriendsText}>
            모든 사용자와 친구 상태이거나 친구 요청을 전송하였습니다.
          </Text>
        </View>
      )}

    </View>
  );
};

export default SearchFriendScreen;
