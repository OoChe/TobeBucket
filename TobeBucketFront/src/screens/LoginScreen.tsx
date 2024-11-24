import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from '../styles/LoginScreen.styles';
import { login } from '../apis/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true); // 기본값 true로 설정

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
        Alert.alert('로그인 실패', response.message);
      }
    } catch (error: any) {
      // 에러 처리
      Alert.alert('로그인 실패', error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
      console.error('로그인 에러:', error);
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/icons/login.png')} // 로고 이미지
          style={styles.logoImage}
        />
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          value={userId}
          placeholder="아이디를 입력하세요"
          onChangeText={setUserId}
        />

        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={ { flex: 1 }} // 입력 필드를 확장
            placeholder="비밀번호를 입력하세요"
            value={pwd}
            onChangeText={setPwd}
            secureTextEntry={isPasswordHidden} // 기본적으로 비밀번호 숨김
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordHidden
                  ? require('../assets/icons/eyeoff.png') // 눈 감기 아이콘
                  : require('../assets/icons/eye.png') // 눈 뜨기 아이콘
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원 가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
