/*
 [마이페이지에서 프로필 요약 컴포넌트]
  - 파라미터
    1) profileImage : 친구 프로필 이미지
    2) mbti : MBTI
    3) nickname : 닉네임
    4) intro : 한줄 소개
    5) onPress :
 */


import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


interface MyPageShortProps {
  profileImage: any;
  mbti: string;
  nickname: string;
  intro: string;
  onPress: () => void;

}

const MyPageShort: React.FC<MyPageShortProps> = ({ profileImage, mbti, nickname, intro, onPress }) => {

  const navigation = useNavigation();
  const isValidUri = typeof profileImage === 'string' && (profileImage.startsWith('http')|| profileImage.startsWith('file'));

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

      {/* 친구 프로필 정보 */}
      <View style={styles.userInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.username}>{nickname}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{mbti}</Text>
          </View>
          <TouchableOpacity style={styles.changeInfo} onPress={onPress}>
            <Image source={require('../assets/icons/searchgr.png')} style={styles.searchIcon} />
            <Text style={styles.changeInfoText}>정보 수정</Text>
          </TouchableOpacity>
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  userInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
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


  changeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 4,
    tintColor: '#1E6969',
  },

  changeInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E6969',
    marginBottom: 5

  },

  intro: {
    fontSize: 16,
    color: '#424242',
    marginTop: 4,
    lineHeight: 18,
  },
});

export default MyPageShort;