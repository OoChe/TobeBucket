/*
 [헤더 컴포넌트]
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/Header.styles'; // 스타일 파일 import

const Header = () => {
  return (
    <View style={styles.headerContainer}>
       {/* 로코 */}
      <View style={styles.logoContainer}>
        <Text style={styles.title}>ToBucket</Text>
        <Image source={require('../assets/icons/logo.png')} style={styles.logo} />
      </View>

       {/* 알림 */}
      <TouchableOpacity onPress={() => { /* 알림 클릭 시 동작 추가 */ }}>
        <Image source={require('../assets/icons/bell.png')} style={styles.bellIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
