/* [MBTI 버킷 컴포넌트]
1) 파라미터
    - bucketName: 버킷 고유 이름
    - bucketContent: 버킷 내용
    - achieveDate: 버킷 달성 일자
    - achievementMedia: 버킷 달성 후기 이미지
2) 추가 구현 사항
    1) 스티커 첨부하기
*/
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {dateToStr} from './dateFunc';

interface mbtiFeedShortProps {
  bucketName: string;
  bucketContent: string;
  achieveDate?: string;
  achievementMedia?: string;
}

export const MbtiFeedShort = ({
  bucketName,
  bucketContent,
  achieveDate,
  achievementMedia,
}: mbtiFeedShortProps) => {
  return (
    <View>
      <View style={styles.bucketContainer}>
        <View
          style={{
            marginLeft: 14,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/icons/travel.png')}
            style={{
              position: 'relative',
              marginVertical: 10,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {bucketName}
            </Text>
            {achieveDate ? (
              <Text style={styles.dateText}>
                {achieveDate} &nbsp;달성
              </Text>
            ) : (
              <Text style={styles.dateText}>진행 중</Text>
            )}
          </View>
        </View>
        {achievementMedia ? (
          <Image
            source={{uri: achievementMedia}}
            style={styles.imageContainer}></Image>
        ) : null}
        {bucketContent ? (
          <Text style={styles.contentText}>{bucketContent}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bucketContainer: {
    width: 360,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 'auto',
    marginBottom: 10,
    paddingBottom: 15, // 텍스트 상하 간격을 위해 추가
  },
  textContainer: {
    width: 241,
    position: 'relative',
    marginLeft: 20,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
    position: 'relative',
    top: '18%',
  },
  dateText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#6C7278',
    position: 'relative',
    top: '20%',
  },
  imageContainer: {
    width: 330,
    height: 200,
    borderRadius: 10,
    position: 'relative',
    marginLeft: 14,
    marginTop: 5,
  },
  contentText: {
    width: 330,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    position: 'relative',
    top: 5,
    marginLeft: 14,
  },
});

export default MbtiFeedShort;
