/*
 [친구 버킷에서 프로필 요약 컴포넌트]
  - 파라미터
    1) profileImage : 친구 프로필 이미지
    2) mbti : MBTI
    3) nickname : 닉네임
    4) intro : 한줄 소개
 */


import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface FriendProfileShortProps {
  profileImage: any;
  mbti: string;
  nickname: string;
  intro: string;
}

const FriendProfileShort: React.FC<FriendProfileShortProps> = ({ profileImage, mbti, nickname, intro }) => {
  return (
    <View style={styles.container}>
      {/* 프로필 이미지 */}
      <Image source={profileImage} style={styles.profileImage} />

      {/* 친구 프로필 정보 */}
      <View style={styles.userInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.username}>{nickname}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{mbti}</Text>
          </View>
        </View>
        <Text style={styles.intro}>{intro}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: '#FBFBFB',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#6096FD',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  badge: {
    marginLeft: 10,
    backgroundColor: '#F5F5F5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EE4963',
  },

  intro: {
    fontSize: 14,
    color: '#000000',
  },
});

export default FriendProfileShort;
