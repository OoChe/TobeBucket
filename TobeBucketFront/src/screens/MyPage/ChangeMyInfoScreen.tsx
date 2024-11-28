/*
 [내 정보 수정하기 스크린]
 - 구성 : 헤더, 프로필 사진, 닉네임, MBTI, 한 줄 소개 입력
 - 함수
 1) 내 정보 수정
  - handleUploadImage : 이미지 업로드 처리
  - handleOpenLink : MBTI 유형 검사 URL 처리
  - handleSubmit : 입력된 정보 중 수정된 정보만 모아 서버 전송
  - confirmSubmit : 닉네임 필수 항목 확인
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles/ChangeMyInfoScreen.styles';
import PageTitle from '../../components/PageTitle';
import {launchImageLibrary} from 'react-native-image-picker';
import MBTI_LIST from '../../data/mbti'; // MBTI 리스트
import { patchMyInfo } from '../../apis/mypage/mypageService';

const ChangeMyInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const profile = route.params?.profile;
  const [nickname, setNickname] = useState(profile.nickname);
  const [mbti, setMbti] = useState(profile.mbti);
  const [intro, setIntro] = useState(profile.intro);
  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const isValidUri = typeof profileImage === 'string' && profileImage.startsWith('http');

  {/* 이미지 업로드 */}
  const handleUploadImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('이미지 선택 취소');
      } else if (response.errorMessage) {
        console.error('이미지 선택 에러: ', response.errorMessage);
      } else {
        console.log('이미지 선택 완료: ', response.assets[0].uri);
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  {/* MBTI 유형 검사 링크 연결 */}
  const handleOpenLink = () => {
    const url = 'https://www.16personalities.com/free-personality-test'; // MBTI 테스트 URL
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  {/* 이름 입력 확인 */}
  const confirmSubmit = () => {
      if (!nickname) {
          Alert.alert('오류', '닉네임은 필수 입력 항목입니다.');
      }
      else {
          handleSubmit();
      }
  };


  {/* 수정된 정보 업데이트 */}
  const handleSubmit = async () => {
    const updatedData: any = {};

    if (nickname !== profile.nickname) {
      updatedData.nickname = nickname;
    }
    if (mbti !== profile.mbti) {
      updatedData.mbti = mbti;
    }
    if (intro !== profile.intro) {
      updatedData.intro = intro;
    }
    if (profileImage !== profile.profileImage) {
      updatedData.profileImage = profileImage;
    }

    console.log("정보 수정 완료: ", updatedData);

    try {
      await patchMyInfo(updatedData);
      navigation.navigate('MyPageMain', { updatedProfile: updatedData });

    } catch (err: any) {
      console.error('나의 수정된 정보 전송 오류:', err);
      setError(err.message || '나의 수정된 정보를 전송하는 중 오류가 발생했습니다.');
    }

  };




  return (
    <ScrollView contentContainerStyle={styles.main}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/icons/backArrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <PageTitle title="정보 수정하기" colorCode="#B6E7CC" />
      </View>

      {/* 프로필 사진 */}
      <View style={styles.profileContainer}>
         <Image
           source={
             isValidUri
               ? { uri: profileImage }
               : require('../../assets/images/defaultProfile.png')
           }
           style={styles.profileImage}
         />
        <TouchableOpacity onPress={handleUploadImage} style={styles.uploadButton} >
          <Image
            source={require('../../assets/icons/uploadphoto.png')}
          />
        </TouchableOpacity>
      </View>

      {/* 닉네임 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>닉네임</Text>
        <TextInput
          value = {nickname}
          style={styles.inputField}
          placeholder="닉네임을 입력하세요"
          onChangeText={setNickname}
        />
      </View>

      {/* MBTI 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>MBTI</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={mbti}
            onValueChange={setMbti}
            style={styles.picker}
          >
            {MBTI_LIST.map((mbti) => (
              <Picker.Item key={mbti.label} label={mbti.label} value={mbti.label} />
            ))}
          </Picker>
        </View>
        <View style={styles.mbtiLinkContainer}>
          <Text style={styles.mbtiLinkText}>아직 MBTI가 없으신가요?</Text>
            <TouchableOpacity onPress={handleOpenLink}>
              <Text style={styles.mbtiLink}>검사 바로 가기</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* 한 줄 소개 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>한 줄 소개</Text>
        <TextInput
          value = {intro}
          style={styles.inputField}
          placeholder="자신을 소개해 주세요"
          onChangeText={setIntro}
        />
      </View>

      {/* 수정 완료 버튼 */}
      <TouchableOpacity onPress={confirmSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>수정 완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangeMyInfoScreen;
