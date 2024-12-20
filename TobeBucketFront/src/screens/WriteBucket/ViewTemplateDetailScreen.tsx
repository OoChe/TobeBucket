/*
 [템플릿 상세 보기 스크린]
 - 구성 : 헤더, 버킷 리스트 제목, 중간 목표, 버튼
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/WriteBucketStackNavigator';
import styles from '../../styles/ViewTemplateDetailScreen.styles';
import PageTitle from '../../components/PageTitle';
import TemplateDetail from '../../components/TemplateDetail';

const ViewTemplateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const template = route.params?.template;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageTitle title="템플릿 상세 보기" colorCode="#88B9FF" />
      <TemplateDetail templateDetail = {template}/>

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        {/* 내 버킷으로 가져오기 */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('WriteBucketRequired', { template })}>
          <Text style={styles.backButtonText}>내 버킷으로 가져오기</Text>
        </TouchableOpacity>

        {/* 취소 */}
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.goBack()}>
          <Text style={styles.submitButtonText}>취소</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};



export default ViewTemplateDetailScreen;
