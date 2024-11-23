import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/LoginScreen.styles';

const LoginScreen = ({ navigation }: any) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true); // 기본값 true로 설정

  const handleLogin = () => {
    console.log('로그인 요청:', { userid, password });
    // 로그인 요청 처리 추가
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
          value={userid}
          placeholder="아이디를 입력하세요"
          onChangeText={setUserid}
        />

        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={ { flex: 1 }} // 입력 필드를 확장
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
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
