// [MBTI 버킷 피드 화면]
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import axios from 'axios';
import styles from '../../styles/MbtiBucketFeedScreen.styles';
import PageTitle from '../../components/PageTitle';
import MbtiButton from '../../components/MbtiButton';
import {MBTI} from '../../data/MbtiCategories';
import MbtiFeedShort from '../../components/MbtiFeedShort';
import {MBTIBucket} from '../../data/tempBucketData';

const MbtiBucketFeedScreen = () => {
  const [mbtiString, setMbtiString] = useState('ENFP');

  const [selectedTypes, setSelectedTypes] = useState({
    0: 'E', // E vs I
    1: 'N', // N vs S
    2: 'F', // F vs T
    3: 'P', // P vs J
  });

  // 선택된 MBTI를 서버로 전달
  const fetchBucketList = async () => {
    try {
      // 선택한 MBTI 문자열 생성
      setMbtiString(Object.values(selectedTypes).join(''));
      console.log(mbtiString);

      //   // 서버로 요청 보내기
      //   const response = await axios.post('https://your-server-url.com/api/bucketlist', {
      //     mbti: mbtiString,
      //   });

      //   // 서버로부터 받은 데이터 처리
      //   console.log('서버 응답:', response.data);
      //   Alert.alert('버킷리스트 로드 성공', `MBTI: ${mbtiString}`);
      //   // 이 데이터를 나중에 컴포넌트에 전달해 표시 가능
    } catch (error) {
      console.error('버킷리스트 로드 중 오류 발생:', error);
      Alert.alert(
        '버킷리스트 로드 실패',
        '서버와의 통신 중 문제가 발생했습니다.',
      );
    }
  };

  // MBTI 선택 처리
  const handleMBTISelect = (id: number, type: string) => {
    setSelectedTypes(prev => ({
      ...prev,
      [id]: type, // 같은 그룹(id)에 대해 새 선택값 적용
    }));
  };

  // 첫 번째 행과 두 번째 행으로 버튼 분리
  const firstRow = MBTI.filter(
    mbti =>
      mbti.type === 'E' ||
      mbti.type === 'N' ||
      mbti.type === 'F' ||
      mbti.type === 'P',
  );
  const secondRow = MBTI.filter(
    mbti =>
      mbti.type === 'I' ||
      mbti.type === 'S' ||
      mbti.type === 'T' ||
      mbti.type === 'J',
  );

  // 버튼 변경 시 서버 호출
  useEffect(() => {
    fetchBucketList();
  }, [selectedTypes]);

  return (
    <View style={styles.main}>
      <PageTitle title="MBTI 버킷 피드" colorCode="#ff8736" />
      <View style={{paddingHorizontal: 10}}>
        <View style={styles.buttonGroup}>
          {/* 첫 번째 행 */}
          <View style={styles.row}>
            {firstRow.map(mbti => (
              <MbtiButton
                key={`${mbti.id}-${mbti.type}`}
                label={mbti.label}
                borderColor={mbti.borderColor}
                isSelected={selectedTypes[mbti.id] === mbti.type}
                onPress={() => handleMBTISelect(mbti.id, mbti.type)}
              />
            ))}
          </View>
          {/* 두 번째 행 */}
          <View style={styles.row}>
            {secondRow.map(mbti => (
              <MbtiButton
                key={`${mbti.id}-${mbti.type}`}
                label={mbti.label}
                borderColor={mbti.borderColor}
                isSelected={selectedTypes[mbti.id] === mbti.type}
                onPress={() => handleMBTISelect(mbti.id, mbti.type)}
              />
            ))}
          </View>
        </View>
        <View style={styles.borderLine} />
        {/* MBTI 버킷리스트 목록 */}
        <ScrollView>
          <Text style={styles.MbtiText}>{mbtiString}</Text>
          {MBTIBucket.map((bucket, index) => (
            <MbtiFeedShort
              key={index}
              bucketName={bucket.bucketName}
              bucketContent={bucket.bucketContent}
              achieveDate={bucket.achieveDate}
              achievementMedia={bucket.achievementMedia}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MbtiBucketFeedScreen;
