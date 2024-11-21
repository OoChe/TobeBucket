import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBucketScreen from '../screens/MyBucket/MyBucketScreen';
import MyBucketDetailScreen from '../screens/MyBucket/MyBucketDetailScreen';
import AchievementRecordScreen from '../screens/MyBucket/AchievementRecordScreen';

type StackParamList = {
  MyBucketList: undefined;
  MyBucketDetail: undefined;
  AchievementRecordScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyBucketStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyBucketList" options={{headerShown: false}}>
        {props => <MyBucketScreen />}
      </Stack.Screen>

      <Stack.Screen name="MyBucketDetail" options={{headerShown: false}}>
        {props => <MyBucketDetailScreen />}
      </Stack.Screen>

      <Stack.Screen name="AchievementRecord" options={{headerShown: false}}>
        {props => <AchievementRecordScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MyBucketStackNavigator;
