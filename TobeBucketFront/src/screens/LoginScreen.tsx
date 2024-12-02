/*
 [로그인 스크린]
 - 구성 : 로고, 아이디, 비밀번호 입력, 로그인 버튼, 구분선, 회원 가입 버튼
 - 함수
 1) 로그인 처리
  - handleLogin : 아이디, 비밀번호 입력 확인 후 로그인 처리
  - togglePasswordVisibility : 비밀번호 표시 유무 처리
 2) 회원 가입 스크린 이동
  - handleSignup : 회원 가입 스크린으로 이동
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from '../styles/LoginScreen.styles';
import { login } from '../apis/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  {/* 로그인*/}
  const handleLogin = async () => {
    if (!userId || !pwd) {
      Alert.alert('오류', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      const response = await login({ userId, pwd });
      if (response.code === 'SU') {
        await AsyncStorage.setItem('authToken', response.token);
        navigation.navigate('Main');
      } else {
        Alert.alert('로그인 실패', "네트워크 연결을 확인해주세요.");
      }
    } catch (error: any) {
      Alert.alert('로그인 실패', error.response?.data?.message || '아이디와 비밀번호를 확인해주세요.');
      console.error('로그인 에러:', error);
    }
  };

  {/* 비밀번호 표시 */}
  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  {/* 회원 가입 스크린 이동 */}
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/icons/login.png')}
          style={styles.logoImage}
        />
      </View>

      {/* 아이디 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          value={userId}
          placeholder="아이디를 입력하세요"
          onChangeText={setUserId}
        />

      {/* 비밀 번호 */}
        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={ { flex: 1 }}
            placeholder="비밀번호를 입력하세요"
            value={pwd}
            onChangeText={setPwd}
            secureTextEntry={isPasswordHidden}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordHidden
                  ? require('../assets/icons/eyeoff.png')
                  : require('../assets/icons/eye.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 구분선 */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원 가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
