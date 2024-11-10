import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {getCategoryIconById, getCategoryLabelById} from '../data/bucketIcon';

interface bucketShortProps {
  title: string;
  description: string;
  date: Date;
  category: number;
}

export const MyBucketShort = ({
  title,
  description,
  date,
  category,
}: bucketShortProps) => {
  return (
    <SafeAreaView>
      <View style={styles.bucketContainer}>
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
              style={{
                position: 'relative',
                marginTop: 10,
              }}
            />
            <Text // 왼쪽 아이콘 영역
              style={{
                fontFamily: 'Pretendard-Regular',
                fontSize: 10,
                color: '#000000',
                position: 'relative',
                textAlign: 'center',
                marginTop: 3,
              }}>
              {getCategoryLabelById(category)}
            </Text>
          </View>
          <View // 제목, 설명, 날짜 영역
            style={{
              width: 241,
              position: 'relative',
              marginLeft: 20,
            }}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            <Text style={styles.dateText}>목표 달성 날짜 : {date}</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bucketContainer: {
    width: 360,
    height: 108,
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 'auto',
    marginBottom: 10,
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
    height: 1,
    backgroundColor: '#72777A',
  },
  icon: {
    fontSize: 15,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyBucketShort;
