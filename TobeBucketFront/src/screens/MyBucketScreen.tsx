import React from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ViewMyBucketToggle from '../components/ViewMyBucketToggle.tsx';
import PageTitle from '../components/PageTitle.tsx'

const MyBucketScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic">
        <PageTitle title='나의 버킷' colorCode='#B6E7CC'/>
        {/* 나의 버킷 타이틀 추가 */}
        <ViewMyBucketToggle />
        <Text
          style={{
            display: 'flex',
            width: 242,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
            fontSize: 16,
            color: '#707070',
            position: 'relative',
            textAlign: 'center',
            marginTop: 90,
            marginLeft: 77,
          }}>
          아직 작성한 버킷이 없어요
        </Text>
        {/* 슬퍼하는 버킷이 이미지 추가 */}
        <Text
          style={{
            display: 'flex',
            width: 390,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
            fontSize: 24,
            color: '#000000',
            position: 'relative',
            textAlign: 'center',
            marginTop: 13,
            marginLeft: 3,
          }}>
          버킷을 작성하러 가볼까요?
        </Text>
        <View
          style={{
            width: 145,
            height: 30,
            backgroundColor: '#1e6969',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#1e6969',
            borderStyle: 'solid',
            position: 'relative',
            marginTop: 35,
            marginLeft: 125,
          }}>
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Pretendard-Regular',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'center',
            }}>
            버킷 작성하러가기
          </Text>
        </View>
        {/* <Button
          style={{
            width: 145,
            height: 31,
            borderTopLeftRadius: 10.769,
            borderTopRightRadius: 10.769,
            borderBottomRightRadius: 10.769,
            borderBottomLeftRadius: 10.769,
            borderWidth: 1.077,
            borderColor: '#1e6969',
            borderStyle: 'solid',
            position: 'relative',
            zIndex: 1,
            marginTop: 20,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 125,
          }}>
          <Text
            style={{
              display: 'flex',
              width: '93.42%',
              height: '65.38%',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Pretendard Variable',
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 16.707,
              color: '#1e6969',
              position: 'absolute',
              top: '11.91%',
              left: '1.89%',
              textAlign: 'center',
              zIndex: 2,
            }}
            numberOfLines={1}>
            템플릿 구경하기
          </Text>
        </Button> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBucketScreen;
