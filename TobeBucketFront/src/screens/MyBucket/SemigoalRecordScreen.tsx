/* [ 중간 목표 달성 기록 화면 ]
추가할 사항들
 */
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PageSmallTitle from '../../components/PageSmallTitle';
import {dateToStr, getToday} from '../../components/dateFunc';
import StickerSelector from '../../components/StickerSelector';
import styles from '../../styles/AchievementRecordScreen.styles';
import {
  getUnlockedSticker,
  semiAchieveRecord,
} from '../../apis/bucket/achieveService';
import {semiGoalRecordData} from '../../apis/types';

interface semiGoalProps {
  bucketId: number;
  bucketName: string;
  semiGoalId: number;
  semiGoalName: string;
}

const SemigoalRecordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bucketId, bucketName, semiGoalId, semiGoalName} =
    route.params as semiGoalProps;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [stickerProcess, setStickerProcess] = useState(0);
  const [semiAchieveInfo, setsemiAchieveInfo] = useState({
    bucketId: bucketId,
    stickerId: -1,
    semiGoalId: semiGoalId,
    achieveDate:
      getToday().getFullYear() +
      '-' +
      (getToday().getMonth() + 1) +
      '-' +
      getToday().getDate(),
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const validateInputs = () => {
    const missingFields = [];
    if (
      semiAchieveInfo.stickerId === null ||
      semiAchieveInfo.stickerId === undefined
    ) {
      missingFields.push('스티커');
    }
    if (!semiAchieveInfo.achieveDate) missingFields.push('달성 날짜');

    if (missingFields.length > 0) {
      const errorMsg = missingFields.join(', ').replace(/,([^,]*)$/, ' 및$1');
      Alert.alert('입력 오류', `${errorMsg}를 입력해주세요.`);
      return false;
    }
    return true;
  };

  const handleConfirm = (date: Date) => {
    const formattedDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    setsemiAchieveInfo(prevData => ({
      ...prevData,
      achieveDate: formattedDate,
    }));
    hideDatePicker();
  };

  const submitSemiAchievement = async () => {
    if (validateInputs()) {
      // 중간 목표 필터링
      const semiRecordInfo: semiGoalRecordData = {
        bucketId: semiAchieveInfo.bucketId,
        stickerId: semiAchieveInfo.stickerId,
        semiGoalId: semiAchieveInfo.semiGoalId,
        achieveDate: semiAchieveInfo.achieveDate,
      };

      // 데이터 확인을 위한 로그 출력
      console.log(
        '중간 목표 달성 기록 데이터:',
        JSON.stringify(semiRecordInfo, null, 2),
      );

      try {
        // 중간 목표 달성 기록 API 호출
        const response = await semiAchieveRecord(semiRecordInfo);
        Alert.alert('성공', '중간 목표를 달성하였습니다!');
        navigation.navigate('MyBucketDetail', {
          screen: 'MyBucketDetail',
          params: {bucketId},
        });
      } catch (error: any) {
        console.error('중간 목표 달성 기록 오류:', error);
        const errorMessage =
          error.response?.data?.message ||
          '중간 목표 달성 기록 중 오류가 발생했습니다.';
        Alert.alert('오류', errorMessage);
      }
    }
  };

  const getStickerNum = async () => {
    const data = await getUnlockedSticker();
    setStickerProcess(data);
    console.log('받아온 데이터: ', data);
  };

  useEffect(() => {
    getStickerNum();
    if (bucketId) {
      setsemiAchieveInfo(prevData => ({
        ...prevData,
        bucketId: bucketId, // bucketId 설정
      }));
    } else {
      console.error('bucketId is undefined'); // 디버그용 에러 로그
    }
  }, [bucketId]);

  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/icons/backArrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={{marginLeft: -5, marginTop: -6}}>
          <PageSmallTitle title="중간목표 달성 기록하기" colorCode="#B6E7CC" />
        </View>
      </View>
      <View style={styles.Container}>
        <Text>{bucketName}</Text>
        <Text style={styles.titleText}>{semiGoalName}</Text>
        <Text style={styles.subText}>
          <Text style={{color: '#35BA71'}}>*</Text>
          <Text> 표시는 필수 입력 항목입니다.</Text>
        </Text>
        <View>
          <View style={styles.itemContainer}>
            <Text style={styles.subTitleText}>
              1. 스티커 선택하기(최대 1개)
              <Text style={{color: '#35BA71'}}>*</Text>
            </Text>
            <TouchableOpacity style={styles.stickerButton}>
              <Text style={styles.sticketText}>스티커 잠금해제</Text>
            </TouchableOpacity>
          </View>
          <StickerSelector
            unlockedIndex={stickerProcess}
            onSelectSticker={stickerId => {
              setsemiAchieveInfo(prevData => ({
                ...prevData,
                stickerId: stickerId, // 선택된 스티커 ID 업데이트
              }));
            }}
          />

          {/* 스티커 가로로 정렬 표시 */}
          <View style={styles.itemContainer}>
            <Text style={styles.subTitleText}>
              2. 달성 날짜
              <Text style={{color: '#35BA71'}}>&nbsp;*</Text>
            </Text>
            <TouchableOpacity style={styles.imageIcon} onPress={showDatePicker}>
              <Text style={styles.normalText}>
                {selectedDate ? selectedDate : dateToStr(getToday())}
              </Text>
              <Image
                source={require('../../assets/icons/selectCalendar.png')}
                style={{position: 'absolute', right: 10, top: 5}}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              maximumDate={getToday()} // 오늘 날짜까지 선택 가능
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => submitSemiAchievement()}>
          <Text style={styles.saveText}>저장하기</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 10,
            textAlign: 'center',
            marginLeft: -15,
          }}>
          저장 완료 시 수정이 불가능합니다.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SemigoalRecordScreen;
