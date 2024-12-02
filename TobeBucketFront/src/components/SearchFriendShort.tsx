/*
 [친구 검색 시 나타나는 프로필 요약 컴포넌트]
  - 파라미터
    1) profileImage : 친구 프로필 이미지
    2) mbti : MBTI
    3) nickname : 닉네임
    4) onAdd : 친구 신청 버튼 클릭 시 함수 처리
 */


import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface SearchFriendShortProps {
  profileImage: any;
  mbti: string;
  nickname: string;
  onAdd: () => void;
  isRequested: () => void;
}

const SearchFriendShort: React.FC<SearchFriendShortProps> = ({ profileImage, mbti, nickname, onAdd, isRequested }) => {

  const isValidUri = typeof profileImage === 'string' && profileImage.startsWith('http');

  return (
    <View style={styles.container}>
      {/* 프로필 이미지 */}
      <Image
        source={
          isValidUri
            ? { uri: profileImage } // URI가 유효하면 해당 이미지 사용
            : require('../assets/images/defaultProfile.png') // 기본 이미지
        }
        style={styles.profileImage}
      />


      {/* 사용자 프로필 */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>{nickname}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{mbti}</Text>
        </View>
      </View>

      {/* 친구 신청 */}

      <TouchableOpacity
        onPress={onAdd}
        disabled={isRequested}
        style={[styles.addFriendButton, isRequested && styles.disabledButton]}
      >
        <Text style={[styles.addFriendButtonText, isRequested && styles.disabledButtonText]}>
          {isRequested ? '신청 완료' : '친구 신청'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FBFBFB',
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  badge: {
    marginTop: 4,
    backgroundColor: '#E3E3E3',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EE4963',
  },
  addFriendButton: {
    borderWidth: 1,
    borderColor: '#6A82FF',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addFriendButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A82FF',
  },

  disabledButton: {
    borderWidth: 1,
    borderColor: '#6C7278',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  disabledButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6C7278',
  },

});

export default SearchFriendShort;
