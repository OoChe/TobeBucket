/*
 [달성 예정 버킷 컴포넌트]
  - 파라미터
    1) id: 버킷별 고유번호
    2) title: 버킷리스트 제목
    3) description: 버킷리스트 설명
    4) date: 버킷리스트 목표 달성 희망 날짜
    5) category: 버킷리스트 카테고리
  - 
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {getCategoryIconById, getCategoryLabelById} from '../data/bucketIcon';

interface bucketShortProps {
  bucketID: number;
  bucketName: string;
  bucketContent: string;
  goalDate: Date;
  category: number;
}

export const MyBucketShort = ({ bucketID, bucketName, bucketContent, goalDate, category }: bucketShortProps) => {
  const dateToStr = (goalDate: Date) => { 
    var year = goalDate.getFullYear();
    var month = goalDate.getMonth()+1;
    var day = goalDate.getDate();
  
    return year+'.'+month+'.'+day;
  }
  return (
    <View>
      <TouchableOpacity style={styles.bucketContainer}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            marginLeft: 13,
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={getCategoryIconById(category)}
              style={styles.icon}
            />
            <Text style={styles.categoryText}>
              {getCategoryLabelById(category)}
            </Text>
          </View>
          <View
            style={styles.textContainer}>
            <Text style={styles.titleText}>{bucketName}</Text>
            <Text style={styles.descriptionText}>{bucketContent}</Text>
            <Text style={styles.dateText}>목표 달성 날짜 : {dateToStr(goalDate)}</Text>
          </View>
        </View>
        {/* 아래 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>달성 기록</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>수정하기</Text>-
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bucketContainer: {
    width: 360,
    height: 108,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 'auto',
    marginBottom: 10,
  },
  textContainer: {
    width: 241,
    position: 'relative',
    marginLeft: 20,
  },
  titleText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    position: 'relative',
    top: '10%',
  },
  descriptionText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    position: 'relative',
    top: '10%',
  },
  dateText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    color: '#6C7278',
    position: 'relative',
    top: '13%',
  },
  categoryText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    color: '#000000',
    position: 'relative',
    textAlign: 'center',
    marginTop: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: '#72777A',
    marginTop: 10,
    paddingTop: 3,
  },
  buttonText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 11,
    textAlign: 'center',
  },
  button: {
    color: '#333333',
    marginHorizontal: 15,
  },
  divider: {
    height: 10,
    backgroundColor: '#72777A',
  },
  icon: {
    position: 'relative',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyBucketShort;
