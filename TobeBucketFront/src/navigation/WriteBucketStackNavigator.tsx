import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WriteBucketScreen from '../screens/WriteBucket/WriteBucketScreen';
import WriteBucketOptionalScreen from '../screens/WriteBucket/WriteBucketOptionalScreen';
import ViewTemplateScreen from '../screens/WriteBucket/ViewTemplateScreen';
import ViewTemplateDetailScreen from '../screens/WriteBucket/ViewTemplateDetailScreen';


type StackParamList = {
  WriteBucketRequired: undefined;
  WriteBucketOptional: undefined;
  ViewTemplate: undefined;
  ViewTemplateDetail: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const WriteBucketStackNavigator = () => {
  const [bucketInfo, setBucketInfo] = useState({
      bucketName: '',
      bucketContent: '',
      category: '',
      publicStatus: false,
      semiGoalData: [{ semiGoalTitle: "" }] as { semiGoalTitle: string }[],
      goalDate: null as string | null,
      friendNickNameList : [] as string[]
  });

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
        name="WriteBucketRequired"
        options={{ headerShown: false }}
      >
        {(props) => (
          <WriteBucketScreen
            {...props}
            bucketInfo={bucketInfo}
            setBucketInfo={setBucketInfo} // 직접 전달
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
            setBucketInfo={setBucketInfo} // 직접 전달
            sendDataToDB={sendDataToDB}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="ViewTemplate"
        component={ViewTemplateScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>

      <Stack.Screen
        name="ViewTemplateDetail"
        component={ViewTemplateDetailScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default WriteBucketStackNavigator;
