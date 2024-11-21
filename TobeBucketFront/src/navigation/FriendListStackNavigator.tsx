import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendListScreen from '../screens/FriendList/FriendListScreen';
import SearchFriendScreen from '../screens/FriendList/SearchFriendScreen';
import ViewFriendBucketScreen from '../screens/FriendList/ViewFriendBucketScreen';


type StackParamList = {
  FriendList: undefined;
  SearchFriend: undefined;
  FriendBucket: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const FriendListStackNavigator = () => {

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
        name="FriendList"
        component={FriendListScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>


      <Stack.Screen
        name="SearchFriend"
        component={SearchFriendScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>


      <Stack.Screen
        name="FriendBucket"
        component={ViewFriendBucketScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>

    </Stack.Navigator>
  );
};

export default FriendListStackNavigator;
