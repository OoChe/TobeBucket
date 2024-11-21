import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from '../styles/TabNavigator.styles';
import BucketFeedScreen from '../screens/BucketFeedScreen';
import MyBucketStackNavigator from './MyBucketStackNavigator';
import FriendListScreen from '../screens/FriendList/FriendListScreen';
import MyPageScreen from '../screens/MyPage/MyPageScreen';
import WriteBucketStackNavigator from './WriteBucketStackNavigator';
import FriendListStackNavigator from './FriendListStackNavigator';


type TabParamList = {
  BucketFeed: undefined;
  MyBucket: undefined;
  WriteBucket: undefined;
  FriendLists: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'MyBucket') {
            iconSource = require('../assets/icons/home.png');
          } else if (route.name === 'BucketFeed') {
            iconSource = require('../assets/icons/feed.png');
          } else if (route.name === 'WriteBucket') {
            iconSource = require('../assets/icons/bucket.png');
          } else if (route.name === 'FriendList') {
            iconSource = require('../assets/icons/friend.png');
          } else if (route.name === 'MyPage') {
            iconSource = require('../assets/icons/setting.png');
          }
          return (
            <View style={focused ? styles.iconBackground : null}>
              <Image
                source={iconSource}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          );
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#e0e0e0',
        tabBarItemStyle: {
          borderRadius: 10,
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}>
      <Tab.Screen
        name="MyBucket"
        component={MyBucketStackNavigator}
        options={{tabBarLabel: '나의 버킷', headerShown: false}}
      />

      <Tab.Screen
        name="BucketFeed"
        component={BucketFeedScreen}
        options={{tabBarLabel: '버킷 피드', headerShown: false}}
      />

      <Tab.Screen
        name="WriteBucket"
        component={WriteBucketStackNavigator}
        options={{tabBarLabel: '버킷 작성', headerShown: false}}
      />

      <Tab.Screen
        name="FriendList"
        component={FriendListScreen}
        options={{tabBarLabel: '친구 목록', headerShown: false}}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{tabBarLabel: '마이페이지', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
