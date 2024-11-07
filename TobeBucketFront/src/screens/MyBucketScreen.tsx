import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ViewMyBucketToggle from '../components/ViewMyBucketToggle.tsx';
import PageTitle from '../components/PageTitle.tsx';
import CryingBucket from '../assets/images/CryingBucketImg.png';
import styles from '../styles/MyBucketScreen.styles.ts';

// Toggle의 상태(달성 예정/달성 완료)에 따라 화면 변경 구현
// 작성한 버킷이 존재할 경우, 존재하는 버킷 리스트를 표시
const MyBucketScreen = () => {
  return (
    <SafeAreaView>
      <PageTitle title="나의 버킷" colorCode="#B6E7CC" />
      <ViewMyBucketToggle />
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.smallText}>아직 작성한 버킷이 없어요</Text>

        {/* 버킷이를 가운데로 옮기질 못해서 margin으로 설정, 수정 필요 */}
        <Image source={CryingBucket} style={styles.imageStyle} />
        <Text style={styles.largeText}>버킷을 작성하러 가볼까요?</Text>

        {/* 버튼 형식 변경 및 컴포넌트로 이동 필요*/}
        <View
          style={{
            alignContent: 'center',
            width: 145,
            height: 30,
            backgroundColor: '#1e6969',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#1e6969',
            marginTop: 10,
            marginLeft: 125,
            padding: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Pretendard-Regular',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'center',
            }}>
            버킷 작성하러가기
          </Text>
        </View>
        <View
          style={{
            alignContent: 'center',
            width: 145,
            height: 30,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#1e6969',
            borderStyle: 'solid',
            position: 'relative',
            marginTop: 10,
            marginLeft: 125,
            padding: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Pretendard Variable',
              fontSize: 14,
              color: '#1e6969',
              textAlign: 'center',
            }}>
            템플릿 구경하기
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBucketScreen;
