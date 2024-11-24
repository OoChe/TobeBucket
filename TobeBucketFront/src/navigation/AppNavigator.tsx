import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AlarmScreen from '../screens/AlarmScreen';
import TabNavigator from './TabNavigator';
import Header from '../components/Header';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}>
      {/*
      로그인 화면에서는 헤더와 탭을 숨김
      <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} // 로그인 화면에서 헤더 숨기기
      />
      */}
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: true}}
      />
      {/* header가 여기에 있어서 알림 클릭 시 네이게이션 실종 */}
      <Stack.Screen
        name="AlarmList"
        component={AlarmScreen}
        options={{
          presentation: 'modal', // 모달 스타일
          headerShown: true, // 알림 화면에서는 헤더 숨김
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
