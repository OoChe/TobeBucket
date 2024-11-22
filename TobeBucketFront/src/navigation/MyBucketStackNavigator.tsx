import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBucketScreen from '../screens/MyBucket/MyBucketScreen';
import MyBucketDetailScreen from '../screens/MyBucket/MyBucketDetailScreen';
import AchievementRecordScreen from '../screens/MyBucket/AchievementRecordScreen';
import SemigoalRecordScreen from '../screens/MyBucket/SemigoalRecordScreen';

type StackParamList = {
  MyBucketList: undefined;
  MyBucketDetail: undefined;
  AchievementRecord: undefined;
  SemigoalRecord: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyBucketStackNavigator = () => {
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
      <Stack.Screen name="MyBucketList" options={{headerShown: false}}>
        {props => <MyBucketScreen />}
      </Stack.Screen>

      <Stack.Screen name="MyBucketDetail" options={{headerShown: false}}>
        {props => <MyBucketDetailScreen />}
      </Stack.Screen>

      <Stack.Screen name="AchievementRecord" options={{headerShown: false}}>
        {props => (
          <AchievementRecordScreen
            {...props}
            bucketId={props.route.params?.bucketId}
            bucketName={props.route.params?.bucketName}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SemigoalRecord" options={{headerShown: false}}>
        {props => <SemigoalRecordScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MyBucketStackNavigator;
