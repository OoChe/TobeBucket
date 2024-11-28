// [친구 버킷 피드 화면]
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import PageTitle from '../../components/PageTitle';
import FriendFeedShort from '../../components/FriendFeedShort';
import styles from '../../styles/FriendBucketFeedScreen.styles';
import {FriendFeedBucket} from '../../apis/types';
import {getFriendFeedList} from '../../apis/bucket/feedService';

const FriendBucketFeedScreen = () => {
  const [FriendBucketList, setFriendBucketList] = useState<FriendFeedBucket[]>(
    [],
  );

  const getFriendFeedBucketList = async () => {
    try {
      const data = await getFriendFeedList();
      setFriendBucketList(data);
    } catch (err: any) {
      console.error('친구 피드 로드 오류:', err);
      setError(
        err.message ||
          '스크린에서 친구 피드 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
  };

  // 버튼 변경 시 서버 호출
  useEffect(() => {
    getFriendFeedBucketList();
  }, []);

  return (
    <View style={styles.main}>
      <View>
        <PageTitle title="친구 버킷 피드" colorCode="#ff8736" />
      </View>
      {FriendBucketList.length > 0 ? (
        <ScrollView>
          {FriendBucketList.map((bucket, index) => (
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
      ) : (
        <ScrollView>
          <Text style={styles.nobucket}>
            친구가 없거나 공개된 버킷이 없어요.
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default FriendBucketFeedScreen;
