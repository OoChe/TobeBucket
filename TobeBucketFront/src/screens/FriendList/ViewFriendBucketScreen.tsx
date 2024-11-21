/*
 NOTICE : 버킷 피드 컴포넌트 추가 필요

 [친구 버킷 스크린]
 - 구성 : 헤더, 친구 프로필 정보, 버킷 피드(추가 예정)
 */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../../styles/ViewFriendBucketScreen.styles';
import SearchFriendShort from '../../components/SearchFriendShort';
import PageTitle from '../../components/PageTitle';
import FriendProfileShort from '../../components/FriendProfileShort';


const DUMMY_FRIEND_BUCKET_INFO = {
    profile: {
       nickname: "iloveham",
       mbti: "ENFP",
       intro: "럭키비키자나",
       profileImage: require('../../assets/images/hamsterProfile.png')
    },
    bucketList: [
  	 {
  	   bucketName: "제주도 한달 살이",
  	   bucketContent: "재밌당.",
  	   achieveDate: "24.12.08"
  	 },
  	 {
  	   bucketName: "제주도 한달 살이",
  	   bucketContent: "재밌당.",
  	   achieveDate: "24.12.08"
  	 },
    ]
};


const ViewFriendBucketScreen = ({ navigation }: any) => {

  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/icons/backArrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <PageTitle title="친구 버킷 페이지" colorCode="#88B9FF" />
      </View>

      {/* 친구 프로필 정보 */}
      <FriendProfileShort
        profileImage={DUMMY_FRIEND_BUCKET_INFO.profile.profileImage}
        mbti={DUMMY_FRIEND_BUCKET_INFO.profile.mbti}
        nickname={DUMMY_FRIEND_BUCKET_INFO.profile.nickname}
        intro={DUMMY_FRIEND_BUCKET_INFO.profile.intro}
      />

    </View>

  );
};

export default ViewFriendBucketScreen;
