import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface Friend {
  userId: string;
  nickname: string;
  mbti: string;
  profileImage: any;
}

interface FriendRequestProps {
  friend: Friend;
  onAccept: () => void;
  onReject: () => void;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ friend, onAccept, onReject }) => {
  const isValidUri = typeof profileImage === 'string' && profileImage.startsWith('http');

  return (
    <View style={styles.friendRequestContainer}>
      <View style={styles.friendInfoContainer}>
        <Image
          source={
            isValidUri
              ? { uri: profileImage }
              : require('../assets/images/defaultProfile.png') 
          }
          style={styles.profileImage}
        />

        <View style={styles.friendDetails}>
          <Text style={styles.nickname}>{friend.nickname}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{friend.mbti}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
          <Text style={styles.acceptButtonText}>수락</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
          <Text style={styles.rejectButtonText}>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friendRequestContainer: {
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  friendInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendDetails: {
    flex: 1,
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#000000',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#000000',
    marginHorizontal: 5,
  },
  acceptButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  rejectButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  acceptButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  rejectButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },

  badge: {
    backgroundColor: '#E3E3E3',
    marginTop: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: 48
  },

  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EE4963',
  },


});

export default FriendRequest;
