import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyBucketScreen from '../screens/MyBucket/MyBucketScreen';
import MyBucketInfoScreen from '../screens/MyBucket/MyBucketInfoScreen';

type StackParamList = {
  MyBucketList: undefined;
  MyBucketInfo: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyBucketStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBucketList"
        options={{ headerShown: false }}
      >
        {(props) => (
          <MyBucketScreen/>
        )}
      </Stack.Screen>


      <Stack.Screen
        name="MyBucketInfo"
        options={{ headerShown: false }}
      >
        {(props) => (
          <MyBucketInfoScreen/>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MyBucketStackNavigator;
