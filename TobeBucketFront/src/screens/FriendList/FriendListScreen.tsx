import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import styles from '../../styles/FriendListScreen.styles';
import PageTitle from '../../components/PageTitle';
import ListFriendShort from '../../components/ListFriendShort';


const DUMMY_FRIEND_LIST = [
  {
    nickname: "user1",
    mbti: "ENTP",
    profileImage: require('../../assets/images/hamsterProfile.png')
  },

  {
    nickname: "user2",
    mbti: "ENTJ",
    profileImage: require('../../assets/images/hamsterProfile.png')
  },
]



const FriendListScreen = () => {
  return (
    <View style={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <PageTitle title="친구 목록" colorCode="#88B9FF" />
      </View>

      {/* 친구 목록 리스트 */}
      <ScrollView contentContainerStyle={styles.container}>
         {DUMMY_FRIEND_LIST.map((friend, index)=> (
             <ListFriendShort
               key={index}
               profileImage={friend.profileImage}
               mbti={friend.mbti}
               nickname={friend.nickname}
               onEdit={console.log("edit")}
               onMenu={console.log("menu")}
               onPress={console.log("press")}
             />
         ))}

      </ScrollView>
    </View>
  );
};

export default FriendListScreen;
