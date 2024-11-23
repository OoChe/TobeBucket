import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPage/MyPageScreen';
import ChangeMyInfoScreen from '../screens/MyPage/ChangeMyInfoScreen';



type StackParamList = {
  MyPageMain: undefined;
  ChangeMyInfo: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyPageStackNavigator = () => {

  const sendDataToDB = async () => {
      // 백엔드 연결 후, WriteBucketScreen에서는 제거 필요
      try {
        console.log('데이터 전송 중:', bucketInfo);
      } catch (error) {
        console.error('데이터 전송 오류:', error);
      }
  };


  return (
    <Stack.Navigator
        screenOptions={{
            cardStyle: { backgroundColor: '#FBFBFB' },
        }}
    >

      <Stack.Screen
        name="MyPageMain"
        component={MyPageScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>

      <Stack.Screen
        name="ChangeMyInfo"
        component={ChangeMyInfoScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>

    </Stack.Navigator>
  );
};

export default MyPageStackNavigator;
