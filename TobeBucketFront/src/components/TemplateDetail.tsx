/*
 [템플릿 상세 조회 컴포넌트]
  - 파라미터 : templateDetail 객체 (bucketName, bucketContent, category, semiGoalData)
 */


import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getCategoryById } from '../data/bucketCategories';

interface SemiGoal {
  semiGoalTitle: string;
}

interface TemplateDetailProps {
  templateDetail: {
    bucketName: string;
    bucketContent: string;
    category: number;
    semiGoalData?: SemiGoal[];
  };
}

const TemplateDetail: React.FC<TemplateDetailProps> = ({ templateDetail }) => {
  const categoryData = getCategoryById(templateDetail.category);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 버킷 리스트 제목 */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {categoryData && (
            <Image source={categoryData.iconPath} style={styles.icon} />
          )}
        </View>
        <Text style={styles.bucketName}>{templateDetail.bucketName}</Text>
      </View>

      {/* 버킷 리스트 설명 */}
      <Text style={styles.bucketContent}>{templateDetail.bucketContent}</Text>

      {/* 버킷 리스트 중간 목표 */}
      <View style={styles.header}>
        <Image source={require('../assets/icons/semiGoalIcon.png')} style={styles.semiGoalIcon} />
        <Text style={styles.goalTitle}>중간 목표</Text>
      </View>
      {(templateDetail.semiGoalData || []).map((goal, index) => (
        <View key={index} style={styles.goalContainer}>
          <View style={styles.goalNumber}>
            <Text style={styles.goalNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.goalContent}>
            <Text style={styles.goalText}>{goal.semiGoalTitle}</Text>
          </View>
        </View>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FBFBFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 28,
    height: 28,
    marginRight: 20,
  },
  bucketName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  bucketContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  semiGoalIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 40, // 각 항목의 최소 높이를 동일하게 지정
  },
  goalNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D5EBF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  goalNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  goalContent: {
    flex: 1,
    justifyContent: 'center', // 수직 정렬 조정
    paddingBottom : 5
  },
  goalText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default TemplateDetail;
