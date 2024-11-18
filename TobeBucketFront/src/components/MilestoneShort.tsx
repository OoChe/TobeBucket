import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import StickerEmpty from './StickerEmpty';

const MilestoneShort = ({text, isSticker, onPress}) => {
  return (
    <View
      style={{
        width: 363,
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10
      }}>
      <Text
        style={{
          width: 260,
          fontFamily: 'Inter',
          fontSize: 18,
          fontWeight: '700',
        }}
        numberOfLines={1}>
        {text}
      </Text>
      <StickerEmpty/>
    </View>
  );
};

const styles = StyleSheet.create({
  sticker: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default MilestoneShort;
