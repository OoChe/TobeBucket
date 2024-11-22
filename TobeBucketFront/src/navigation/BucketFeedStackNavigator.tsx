import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BucketFeedScreen from '../screens/BucketFeed/BucketFeedScreen';
import FriendBucketFeedScreen from '../screens/BucketFeed/FriendBucketFeedScreen';
import MbtiBucketFeedScreen from '../screens/BucketFeed/MbtiBucketFeedScreen';

type StackParamList = {
  BucketFeedSelect: undefined;
  FriendBucketFeed: undefined;
  MbtiBucketFeed: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const BucketFeedStackNavigator = () => {
  const sendDataToDB = async () => {
    // 백엔드 연결 후, WriteBucketScreen에서는 제거 필요
    try {
      console.log('데이터 전송 중:');
    } catch (error) {
      console.error('데이터 전송 오류:', error);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="BucketFeedSelect" options={{headerShown: false}}>
        {props => <BucketFeedScreen />}
      </Stack.Screen>
      <Stack.Screen name="FriendBucketFeed" options={{headerShown: false}}>
        {props => <FriendBucketFeedScreen />}
      </Stack.Screen>
      <Stack.Screen name="MbtiBucketFeed" options={{headerShown: false}}>
        {props => <MbtiBucketFeedScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default BucketFeedStackNavigator;
