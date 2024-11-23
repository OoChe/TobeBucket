import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Linking, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import styles from '../styles/SignupScreen.styles';
import MBTI_LIST from '../data/mbti'; // MBTI 리스트 불러오기

const SignupScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    mbti: '',
    intro: '',
    role: 'USER', // 기본값 설정
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const handleOpenLink = () => {
    const url = 'https://www.16personalities.com/free-personality-test'; // MBTI 테스트 URL
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSignup = async () => {
    const { userid, password, confirmPassword, nickname, mbti, intro, role } = formData;

    // 유효성 검사
    if (!userid || !password || !confirmPassword || !nickname || !mbti || !intro) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    const requestBody = {
      userId: userid,
      pwd: password,
      nickname,
      mbti,
      intro,
      role,
    };

    console.log(requestBody)

    {/*
    try {
        const response = await fetch('tobebucket/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          Alert.alert('성공', '회원가입이 완료되었습니다.');
          navigation.navigate('Login');
        } else {
          const errorData = await response.json();
          Alert.alert('오류', errorData.message || '회원가입에 실패했습니다.');
        }
      } catch (error) {
        console.error('회원가입 요청 실패:', error);
        Alert.alert('오류', '회원가입 요청 중 문제가 발생했습니다.');
      }
      */}
  };

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
  };

  return (
    <ImageBackground
      source={require('../assets/images/signupback.png')} // 배경 이미지 경로
      style={styles.background} // 배경 스타일
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* 헤더 */}
        <Text style={styles.header}>회원가입</Text>
        <Text style={styles.subHeader}>지금 바로 가입하여 ToBucket과 함께 해보세요!</Text>

        {/* 입력 필드 */}
        <View style={styles.inputContainer}>
          {/* 아이디 */}
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력하세요"
            value={formData.userid}
            onChangeText={(text) => handleInputChange('userid', text)}
          />

          {/* 닉네임 */}
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임을 입력하세요"
            value={formData.nickname}
            onChangeText={(text) => handleInputChange('nickname', text)}
          />

          {/* 비밀번호 */}
          <Text style={styles.label}>비밀번호 설정</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              secureTextEntry={isPasswordHidden}
              onChangeText={(text) => handleInputChange('password', text)}
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

          {/* 비밀번호 확인 */}
          <Text style={styles.label}>비밀번호 확인</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              secureTextEntry={isConfirmPasswordHidden}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Image
                source={
                  isConfirmPasswordHidden
                    ? require('../assets/icons/eyeoff.png')
                    : require('../assets/icons/eye.png')
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* MBTI */}
          <Text style={styles.label}>MBTI</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.mbti}
              onValueChange={(itemValue) => handleInputChange('mbti', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="MBTI를 선택하세요" value="" style={{ color: '#A3A3A3' }} />
              {MBTI_LIST.map((mbti) => (
                <Picker.Item key={mbti.label} label={mbti.label} value={mbti.label} />
              ))}
            </Picker>
          </View>

          <View style={styles.mbtiLinkContainer}>
            <Text style={styles.mbtiText}>아직 MBTI가 없으신가요?</Text>
            <TouchableOpacity onPress={handleOpenLink}>
              <Text style={styles.mbtiLink}>검사 바로 가기</Text>
            </TouchableOpacity>
          </View>

          {/* 한 줄 소개 */}
          <Text style={styles.label}>한 줄 소개</Text>
          <TextInput
            style={styles.input}
            placeholder="자신을 소개해 주세요"
            value={formData.intro}
            onChangeText={(text) => handleInputChange('intro', text)}
          />
        </View>

        {/* 회원가입 버튼 */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>회원 가입</Text>
        </TouchableOpacity>

        {/* 로그인 페이지로 이동 */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>계정을 가지고 계신가요?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>로그인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupScreen;
