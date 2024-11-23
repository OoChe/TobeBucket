/* [ 버킷 달성 기록 화면 ]
추가할 사항들
3) 사진 첨부 클릭 시 사진 선택하도록 
 */
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PageSmallTitle from '../../components/PageSmallTitle';
import {dateToStr, getToday} from '../../components/dateFunc';
import StickerSelector from '../../components/StickerSelector';

interface bucketProps {
  bucketId: number;
  bucketName: string;
}

const AchievementRecordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bucketId, bucketName} = route.params as bucketProps;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [stickerProcess, setStickerProcess] = useState(3);
  const [bucketAchieveInfo, setBucketAchieveInfo] = useState({
    bucketId: bucketId,
    stickerId: -1,
    achieveDate:
      getToday().getFullYear() +
      '-' +
      (getToday().getMonth() + 1) +
      '-' +
      getToday().getDate(),
    goalReview: '',
    achievementMedia: '',
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
      bucketAchieveInfo.stickerId === null ||
      bucketAchieveInfo.stickerId === undefined
    ) {
      missingFields.push('스티커');
    }
    if (!bucketAchieveInfo.achieveDate) missingFields.push('달성 날짜');

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
    setBucketAchieveInfo(prevData => ({
      ...prevData,
      achieveDate: formattedDate,
    }));
    hideDatePicker();
  };

  const submitAchievement = () => {
    validateInputs();
    console.log(bucketAchieveInfo);
  };

  useEffect(() => {
    const fetchUnlockedIndex = async () => {
      console.log(stickerProcess);
      // try {
      //   const response = await axios.get('https://your-api-url.com/unlocked-sticker-index');
      //   setUnlockedIndex(response.data.unlockedIndex);
      // } catch (error) {
      //   console.error('Error fetching unlocked index:', error);
      // }
    };
    fetchUnlockedIndex();
    if (bucketId) {
      console.log('bucketId:', bucketId); // bucketId 값 확인
      setBucketAchieveInfo(prevData => ({
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
          <PageSmallTitle title="달성 기록하기" colorCode="#B6E7CC" />
        </View>
      </View>
      <View style={styles.Container}>
        <Text style={styles.titleText}>{bucketName}</Text>
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
              setBucketAchieveInfo(prevData => ({
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
          <Text style={styles.subTitleText}>3. 사진 첨부</Text>
          <TouchableOpacity style={styles.imageContainer}>
            <Image
              source={require('../../assets/icons/image.png')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                marginTop: 25,
                marginLeft: 145,
              }}
            />
            <Text style={styles.imageText}>사진 선택</Text>
          </TouchableOpacity>
          <Text style={styles.subTitleText}>4. 후기글 작성하기</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="달성 후기 작성란"
            onChangeText={text =>
              setBucketAchieveInfo(prevData => ({
                ...prevData,
                goalReview: text,
              }))
            }
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => submitAchievement()}>
          <Text style={styles.saveText}>저장하기</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 10,
            textAlign: 'center',
            marginLeft: -15,
          }}>
          저장 완료 시 달성 날짜 수정이 불가능합니다.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AchievementRecordScreen;

const styles = StyleSheet.create({
  Container: {
    marginTop: 10,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row', // 가로 정렬
    justifyContent: 'space-between', // 양 끝에 배치
    alignItems: 'center', // 세로 정렬 기준 맞춤
    paddingRight: 10, // 좌우 여백
    marginVertical: 10, // 위아래 여백
  },
  imageContainer: {
    width: 328,
    height: 109,
    backgroundColor: '#ececec',
    borderRadius: 10,
    position: 'relative',
    marginTop: 6,
    marginLeft: 15,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 28,
    color: '#3f6262',
  },
  subTitleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: '#707070',
  },
  subText: {
    fontFamily: 'Inter',
    fontWeight: 'medium',
    fontSize: 12,
  },
  sticketText: {
    display: 'flex',
    fontFamily: 'Pretendard Variable',
    fontSize: 11,
    fontWeight: '400',
    color: '#3f6262',
    textAlign: 'center',
  },
  imageText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Pretendard Variable',
    fontSize: 12,
    color: '#72777a',
    position: 'relative',
    marginLeft: 142,
  },
  stickerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3f6262',
    paddingHorizontal: 5,
  },
  normalText: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#72777a',
  },
  input: {
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    width: '95%',
    textAlignVertical: 'top',
  },
  saveButton: {
    display: 'flex',
    width: 200,
    height: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e6969',
    borderRadius: 10,
    position: 'relative',
    marginTop: 15,
    marginLeft: 79,
  },
  saveText: {
    fontFamily: 'Pretendard-Medium',
    color: '#ffffff',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  imageIcon: {
    flexDirection: 'row',
    width: 168,
    height: 29,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderColor: '#e3e4e5',
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
  },
});
