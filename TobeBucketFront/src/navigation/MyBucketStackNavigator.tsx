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
  const [bucketInfo, setBucketInfo] = useState({
      title: '',
      description: '',
      category: '',
      isShared: false,
      milestones: [] as string[],
      planningDate: null as Date | null,
      friendList : [] as string[]
  });
  const [category, setCategory] = useState();

  const sendDataToDB = async () => {
      try {
        console.log('데이터 전송 중:', bucketInfo);
      } catch (error) {
        console.error('데이터 전송 오류:', error);
      }
  };


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
