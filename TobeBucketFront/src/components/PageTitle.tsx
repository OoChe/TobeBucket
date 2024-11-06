import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const PageTitle = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontFamily: 'Pretendard-Bold',
          fontSize: 24,
          textAlign: 'center',
        }}
        numberOfLines={1}>
        나의 버킷
      </Text>
      <Circle />
    </View>
  );
};

const Circle = () => {
  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 'auto',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 15,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 100 / 2,
    backgroundColor: '#B6E7CC',
    marginLeft: 5,
  },
});

export default PageTitle;
