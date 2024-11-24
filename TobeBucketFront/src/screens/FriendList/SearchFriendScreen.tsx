/*
 NOTICE : handleAddFriend 함수 내에서 추가 후 서버 전송, response 받은 friendStatus에 따라 예외 처리 필요

 [친구 검색 스크린]
 - 구성 : 헤더, 검색 안내 문구, 검색 입력, 친구 목록
 - 함수
 1) 친구 신청 함수
 - handleAddFriend: 선택된 친구 신청 전송 (보완 필요)
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import styles from '../../styles/SearchFriendScreen.styles';
import SearchFriendShort from '../../components/SearchFriendShort';

const MY_USER_ID = "meee"

const DUMMY_FRIENDS = [
  { id: 'ham2', nickname: '햄햄이', mbti: 'ENFP', profileImage: require('../../assets/images/hamsterProfile.png') },
  { id: 'ham3', nickname: '햄햄삼', mbti: 'ENFP', profileImage: require('../../assets/images/hamsterProfile.png') },
  { id: 'ham4', nickname: '햄햄사', mbti: 'ENFP', profileImage: require('../../assets/images/hamsterProfile.png') },
  { id: 'ham5', nickname: '햄햄오', mbti: 'ENFP', profileImage: require('../../assets/images/hamsterProfile.png') },
  { id: 'ham6', nickname: '햄햄육', mbti: 'ENFP', profileImage: require('../../assets/images/hamsterProfile.png') },
  { id: 'ham7', nickname: '햄햄칠', mbti: 'ENFP', profileImage: require('../../assets/images/hamsterProfile.png') },
];

const SearchFriendScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState<string>('');
  const filteredFriends = DUMMY_FRIENDS.filter((friend) =>
    friend.id.toLowerCase().includes(searchText.toLowerCase())
  );

  {/* 친구 신청 함수 */}
  const handleAddFriend = (id: string) => {
    const requestBody = {
          targetUserId: id,
          userId: MY_USER_ID,
        };

    console.log(requestBody);
    console.log(`${id}에게 친구 신청을 보냈습니다.`);

    Alert.alert(
      "친구 신청 완료",
      `${id}에게 친구 신청을 보냈습니다.`,
      [{ text: "확인", onPress: () => console.log("확인 버튼 눌림") }]
    );

  };

  {/* 친구 목록 */}
  const renderFriendItem = ({ item }: { item: typeof DUMMY_FRIENDS[0] }) => (
    <SearchFriendShort
      profileImage={item.profileImage}
      mbti={item.mbti}
      nickname={item.nickname}
      onAdd={() => handleAddFriend(item.id)}
    />
  );

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
      <FlatList
        data={filteredFriends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.friendList}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
        }
      />
    </View>
  );
};

export default SearchFriendScreen;
