import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WriteBucketScreen from '../screens/WriteBucket/WriteBucketScreen';
import WriteBucketOptionalScreen from '../screens/WriteBucket/WriteBucketOptionalScreen';
import ViewTemplateScreen from '../screens/WriteBucket/ViewTemplateScreen';
import ViewTemplateDetailScreen from '../screens/WriteBucket/ViewTemplateDetailScreen';
import MyBucketScreen from '../screens/MyBucket/MyBucketScreen';


type StackParamList = {
  WriteBucketRequired: undefined;
  WriteBucketOptional: undefined;
  ViewTemplate: undefined;
  ViewTemplateDetail: undefined;
  MyBucketList: undefined;
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
            setBucketInfo={setBucketInfo}
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

      <Stack.Screen
        name="MyBucketList"
        options={{ headerShown: false }}
      >
        {(props) => (
          <MyBucketScreen/>
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
};

export default WriteBucketStackNavigator;
