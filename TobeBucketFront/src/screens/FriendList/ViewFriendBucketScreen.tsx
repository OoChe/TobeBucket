/*
 NOTICE : 버킷 피드 컴포넌트 추가 필요

 [친구 버킷 스크린]
 - 구성 : 헤더, 친구 프로필 정보, 버킷 피드(추가 예정)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../../styles/ViewFriendBucketScreen.styles';
import PageTitle from '../../components/PageTitle';
import FriendProfileShort from '../../components/FriendProfileShort';
import MbtiFeedShort from '../../components/MbtiFeedShort';
import { useNavigation, useRoute } from '@react-navigation/native';


const ViewFriendBucketScreen = () => {
  const navigation = useNavigation();
  const [friendInfo, setFriendInfo] = useState<FriendBucketResponse | null>(null);
  const route = useRoute();
  const { userId, friendData } = route.params as {
    userId: string;
    friendData: FriendBucketResponse;
  };


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
        profileImage={friendData.profile.profileImage}
        mbti={friendData.profile.mbti}
        nickname={friendData.profile.nickname}
        intro={friendData.profile.intro}
      />

      <ScrollView>
        {friendData.bucketList.length > 0 ? (
          friendData.bucketList.map((bucket, index) => (
          <MbtiFeedShort
            key={index}
            bucketName={bucket.bucketName}
            bucketContent={bucket.bucketContent}
            achieveDate={bucket.achieveDate ? new Date(bucket.achieveDate) : null}
            achievementMedia={bucket.achievementMedia}
          />
        ))
       ) : (
           <Text style={[styles.except]}>친구가 공개한 작성된 버킷이 없어요.</Text>
        )}
      </ScrollView>

    </View>

  );
};

export default ViewFriendBucketScreen;
