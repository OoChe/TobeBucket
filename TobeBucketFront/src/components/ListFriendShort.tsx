/*
 [친구 목록에 나타나는 프로필 요약 컴포넌트]
  - 파라미터
    1) profileImage : 친구 프로필 이미지
    2) mbti : MBTI
    3) nickname : 닉네임
    4) onMove : 친구 버킷으로 이동하는 버튼
    5) onDrop : 친구 삭제하기 드롭다운 버튼
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ListFriendShort = ({ profileImage, mbti, nickname, onMove, onDrop }) => {

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

      <View style={styles.userInfo}>
         {/* Username */}
          <Text style={styles.username}>{nickname}</Text>

         {/* Personality Type Badge */}
         <View style={styles.badge}>
           <Text style={styles.badgeText}>{mbti}</Text>
         </View>
      </View>

      {/* Icons Group */}
      <View style={styles.iconGroup}>
        {/* Edit Icon */}
        <TouchableOpacity onPress={onMove} style={styles.iconContainer}>
          <Image source={require('../assets/icons/bucket.png')} style={styles.addIcon} />
        </TouchableOpacity>

        {/* Menu Icon */}
        <TouchableOpacity onPress={onDrop} style={styles.iconContainer}>
          <Image source={require('../assets/icons/dots.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
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
    width: 55,
    height: 55,
    borderRadius: 20,
    marginRight: 10,

  },
  userInfo: {
    flex: 1, // 아이콘 그룹과의 간격 확보
    flexDirection: 'column', // badge와 nickname을 가로로 배치
    alignItems: 'flex-start',
  },

  badge: {
    backgroundColor: '#E3E3E3',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  badgeText: {
    color: '#EE4963',
    fontSize: 12,
    fontWeight: 'bold',
  },
  username: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    paddingHorizontal: 10,
  },

  addIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain"

  }
});

export default ListFriendShort;
