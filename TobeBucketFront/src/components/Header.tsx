
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/Header.styles'; // 스타일 파일 import

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>ToBucket</Text>
        <Image source={require('../assets/icons/logo.png')} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={() => { /* 알림 클릭 시 동작 추가 */ }}>
        <Image source={require('../assets/icons/bell.png')} style={styles.bellIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

