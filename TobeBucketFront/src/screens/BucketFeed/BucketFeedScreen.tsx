// [버킷 피드 선택 화면]
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/BucketFeedScreen.styles';
import PageTitle from '../../components/PageTitle';

const BucketFeedScreen = () => {
  const navigation = useNavigation();
  const handleFriendFeed = () => {
    navigation.navigate('FriendBucketFeed');
  };
  const handleMbtiFeed = () => {
    navigation.navigate('MbtiBucketFeed');
  };
  return (
    <View style={styles.main}>
      <View>
        <PageTitle title="버킷 피드" colorCode="#ff8736" />
        <Text style={styles.smallText}>
          본인의 버킷이 아닌 경우 공개 설정 된 버킷만 열람 가능합니다.
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={styles.subText}>
          보고 싶은 버킷 피드를 {'\n'}선택해주세요!
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 25}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleFriendFeed()}>
            <Text style={styles.buttonText}>친구 피드</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleMbtiFeed()}>
            <Text style={styles.buttonText}>MBTI 별 피드</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BucketFeedScreen;
