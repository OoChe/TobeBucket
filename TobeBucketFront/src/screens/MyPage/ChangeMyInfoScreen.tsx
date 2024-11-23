import React from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/ChangeMyInfoScreen.styles';
import PageTitle from '../../components/PageTitle';
import {launchImageLibrary} from 'react-native-image-picker';


const ChangeMyInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const profile = route.params?.profile;



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
        // 서버 업로드로 전달
        //uploadToServer()
      }
    });
  };


  const handleSubmit = () => {
    console.log("정보 수정 완료");
    // 입력된 데이터를 서버에 전송하세요
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
          source={profile.profileImage}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleUploadImage} style={styles.uploadButton}>
          <Image
            source={require('../../assets/icons/uploadphoto.png')}
          />
        </TouchableOpacity>
      </View>

      {/* 닉네임 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>닉네임</Text>
        <TextInput
          value = {profile.nickname}
          style={styles.inputField}
          placeholder="닉네임을 입력하세요"
        />
      </View>

      {/* MBTI 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>MBTI</Text>
        <TextInput
           value = {profile.mbti}
          style={styles.inputField}
          placeholder="MBTI를 입력하세요"
        />
        <View style={styles.mbtiLinkContainer}>
          <Text style={styles.mbtiLinkText}>아직 MBTI가 없으신가요?</Text>
          <TouchableOpacity>
            <Text style={styles.mbtiLinkButton}>검사 바로 가기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 한 줄 소개 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>한 줄 소개</Text>
        <TextInput
          value = {profile.intro}
          style={styles.inputField}
          placeholder="자신을 소개해 주세요"
        />
      </View>

      {/* 수정 완료 버튼 */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>수정 완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangeMyInfoScreen;
