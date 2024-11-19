/*
 [템플릿 요약 컴포넌트]
  - 파라미터
    1) bucketName : 버킷리스트 제목
    2) bucketContent : 버킷리스트 설명
    3) semiGoalCnt : 중간 목표 개수
    4) category : 카테고리 Id
    5) onAddPress : 추가하기 버튼 클릭 시 함수 처리
    6) onCardPress : 카드 전체 클릭 시 함수 처리
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getCategoryById } from '../data/bucketCategories';

interface TemplateBucketShortProps {
  bucketName: string;
  bucketContent: string;
  semiGoalCnt: number;
  category: number;
  onAddPress: () => void;
  onCardPress: () => void;
}

const TemplateBucketShort: React.FC<TemplateBucketShortProps> = ({
  bucketName,
  bucketContent,
  semiGoalCnt,
  category,
  onAddPress,
  onCardPress,
}) => {
  const categoryData = getCategoryById(category);

  return (
    <View style={styles.card}>
      {/* 카테고리 아이콘 */}
      <TouchableOpacity onPress={onCardPress} style={{ flexDirection: 'row', flex: 1 }}>
        <View style={styles.iconContainer}>
            {categoryData && (
              <Image source={categoryData.iconPath} style={styles.icon} />
            )}
        </View>

        {/* 버킷 리스트 세부 내용 */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{bucketName}</Text>
          <Text style={styles.description}>{bucketContent}</Text>
          <Text style={styles.details}>중간 목표 {semiGoalCnt}개</Text>
        </View>
      </TouchableOpacity>

      {/* 추가하기 버튼 */}
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <Image source={require('../assets/icons/write.png')} style={styles.addIcon} />
        <Text style={styles.addText}>추가하기</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    margin: 8,
  },
  iconContainer: {

    marginTop: 10,
    marginRight: 10,
  },

  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#888',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  addText: {
    fontSize: 12,
    color: '#FF7F50',
    fontWeight: 'bold'
  },
});

export default TemplateBucketShort;
