import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import PageTitle from '../../components/PageTitle';

const MbtiBucketFeedScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View>
        <PageTitle title="MBTI 버킷 피드" colorCode="#ff8736" />
        {/* 버킷별 머시기저시기 */}
      </View>
      
    </View>
  );
};

export default MbtiBucketFeedScreen;

const styles = StyleSheet.create({
  main: {
    minHeight: 1000,
    backgroundColor: '#FBFBFB',
  },
  smallText: {
    height: 15,
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    position: 'relative',
    textAlign: 'left',
    marginLeft: 15,
    marginTop: 5,
  },
  buttonContainer: {
    width: 150,
    height: 85,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff8736',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
    elevation: 7,
  },
  buttonText: {
    display: 'flex',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
