import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlarmScreen from '../screens/AlarmScreen';

type StackParamList = {
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
