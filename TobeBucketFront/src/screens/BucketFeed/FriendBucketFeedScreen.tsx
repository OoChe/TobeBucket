// [친구 버킷 피드 화면]
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView} from 'react-native';
import PageTitle from '../../components/PageTitle';
import FriendFeedShort from '../../components/FriendFeedShort';
import {FriendBucket} from '../../data/tempBucketData';
import styles from '../../styles/FriendBucketFeedScreen.styles';

const FriendBucketFeedScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View>
        <PageTitle title="친구 버킷 피드" colorCode="#ff8736" />
      </View>
      <ScrollView>
        {FriendBucket.map((bucket, index) => (
          <FriendFeedShort
            key={index}
            nickname={bucket.nickname}
            mbti={bucket.mbti}
            profileImage={bucket.profileImage}
            bucketName={bucket.bucketName}
            bucketContent={bucket.bucketContent}
            achieveDate={bucket.achieveDate}
            achievementMedia={bucket.achievementMedia}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendBucketFeedScreen;
