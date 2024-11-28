// [MBTI 버킷 피드 화면]
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import styles from '../../styles/MbtiBucketFeedScreen.styles';
import PageTitle from '../../components/PageTitle';
import MbtiButton from '../../components/MbtiButton';
import {MBTI} from '../../data/MbtiCategories';
import MbtiFeedShort from '../../components/MbtiFeedShort';
import {getMbtiFeedList} from '../../apis/bucket/feedService';
import {MbtiBucket} from '../../apis/types';

const MbtiBucketFeedScreen = () => {
  const [mbtiString, setMbtiString] = useState('ENFP');
  const [MBTIBucketList, setMBTIBucketList] = useState<MbtiBucket[]>([]);

  const [selectedTypes, setSelectedTypes] = useState({
    0: 'E', // E vs I
    1: 'N', // N vs S
    2: 'F', // F vs T
    3: 'P', // P vs J
  });

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

  const getMbtiBucket = async () => {
    try {
      // 최신 selectedTypes 값을 기반으로 mbtiString 계산
      const updatedMbtiString = Object.values(selectedTypes).join('');
      const data = await getMbtiFeedList(updatedMbtiString);
      setMBTIBucketList(data);
      setMbtiString(updatedMbtiString);
    } catch (err: any) {
      console.error('MBTI 피드 로드 오류:', err);
      setError(
        err.message ||
          '스크린에서 MBTI별 버킷 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
  };

  // 버튼 변경 시 서버 호출
  useEffect(() => {
    getMbtiBucket();
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
        <ScrollView>
          <Text style={styles.MbtiText}>{mbtiString}</Text>
          {MBTIBucketList.map((bucket, index) => (
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
