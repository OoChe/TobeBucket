import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WriteBucketScreen from '../screens/WriteBucket/WriteBucketScreen';
import WriteBucketOptionalScreen from '../screens/WriteBucket/WriteBucketOptionalScreen';

type StackParamList = {
  WriteBucketRequired: undefined;
  WriteBucketOptional: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const WriteBucketStackNavigator = () => {
  const [bucketInfo, setBucketInfo] = useState({
      bucketName: '',
      bucketContent: '',
      category: '',
      publicStatus: false,
      semiGoalTitleList: [] as string[],
      goalDate: null as Date | null,
      friendNickNameList : [] as string[]
  });

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
        name="WriteBucketRequired"
        options={{ headerShown: false }}
      >
        {(props) => (
          <WriteBucketScreen
            {...props}
            bucketInfo={bucketInfo}
            setBucketInfo={setBucketInfo}
            sendDataToDB={sendDataToDB}
          />
        )}
      </Stack.Screen>


      <Stack.Screen
        name="WriteBucketOptional"
        options={{ headerShown: false }}
      >
        {(props) => (
          <WriteBucketOptionalScreen
            {...props}
            bucketInfo={bucketInfo}
            setBucketInfo={setBucketInfo}
            sendDataToDB={sendDataToDB}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WriteBucketStackNavigator;
