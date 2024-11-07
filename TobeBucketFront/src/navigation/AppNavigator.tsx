import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import Header from '../components/Header';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            header: () => <Header />,
        }}
    >
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
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
