import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PageTitle from '../../components/PageTitle';

const BucketFeedScreen = () => {
  const navigation = useNavigation();
  const handleFriendFeed = () => {
    navigation.navigate('FriendBucketFeed');
  }
  const handleMbtiFeed = () => {
    navigation.navigate('MbtiBucketFeed');
  }
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
        <Text
          style={{
            display: 'flex',
            fontFamily: 'Pretendard-Regular',
            fontSize: 22,
            color: '#707070',
            letterSpacing: 1,
            lineHeight: 30,
            textAlign: 'center',
            marginTop: 100,
            marginBottom: 30,
          }}>
          보고 싶은 버킷 피드를 {'\n'}선택해주세요!
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 25}}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleFriendFeed()}>
            <Text style={styles.buttonText}>친구 피드</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleMbtiFeed()}>
            <Text style={styles.buttonText}>MBTI 별 피드</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BucketFeedScreen;

const styles = StyleSheet.create({
  main: {
    minHeight: 1000,
    backgroundColor: '#FBFBFB',
  },
  smallText: {
    height: 15,
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    position: 'relative',
    textAlign: 'left',
    marginLeft: 15,
    marginTop: 5,
  },
  buttonContainer: {
    width: 150,
    height: 85,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff8736',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
    elevation: 7,
  },
  buttonText: {
    display: 'flex',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
