import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBucketScreen from '../screens/MyBucket/MyBucketScreen';
import MyBucketDetailScreen from '../screens/MyBucket/MyBucketDetailScreen';
import EditMyBucketScreen from '../screens/MyBucket/EditMyBucketScreen';
import AchievementRecordScreen from '../screens/MyBucket/AchievementRecordScreen';
import SemigoalRecordScreen from '../screens/MyBucket/SemigoalRecordScreen';

type StackParamList = {
  MyBucketList: undefined;
  MyBucketDetail: undefined;
  EditBucket: undefined;
  AchievementRecord: undefined;
  SemiGoalRecord: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyBucketStackNavigator = () => {
  const sendDataToDB = async () => {
    // 백엔드 연결 후, 제거 필요
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
        {props => (
          <MyBucketDetailScreen bucketId={props.route.params?.bucketId} />
        )}
      </Stack.Screen>
      <Stack.Screen name="EditBucket" options={{headerShown: false}}>
        {props => (
          <EditMyBucketScreen
            {...props}
            bucketId={props.route.params?.bucketId}
          />
        )}
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

      <Stack.Screen name="SemiGoalRecord" options={{headerShown: false}}>
        {props => (
          <SemigoalRecordScreen
            {...props}
            bucketId={props.route.params?.bucketId}
            bucketName={props.route.params?.bucketName}
            semiGoalId={props.route.params?.semiGoalId}
            semiGoalName={props.route.params?.semiGoalName}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MyBucketStackNavigator;
