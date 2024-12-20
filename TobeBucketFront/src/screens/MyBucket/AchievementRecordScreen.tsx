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
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import PageSmallTitle from '../../components/PageSmallTitle';
import {dateToStr, getToday} from '../../components/dateFunc';
import StickerSelector from '../../components/StickerSelector';
import styles from '../../styles/AchievementRecordScreen.styles';
import {getUnlockedSticker, achieveRecord} from '../../apis/bucket/achieveService';
import {achieveRecordData} from '../../apis/types';

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
  const [stickerProcess, setStickerProcess] = useState(0);
  const [achievementMedia, setAchevementMedia] = useState();
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

  /* 이미지 업로드 */
  const handleUploadImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('이미지 선택 취소');
      } else if (response.errorMessage) {
        console.error('이미지 선택 에러: ', response.errorMessage);
      } else {
        console.log('이미지 선택 완료: ', response.assets[0].uri);
        setAchevementMedia(response.assets[0].uri);
        Alert.alert('이미지가 선택되었습니다');
      }
    });
  };

  const submitAchievement = async () => {
    if (validateInputs()) {
      const formData = new FormData();
      // 이미지 추가하기
      if (achievementMedia) {
        const file = {
          uri: achievementMedia,
          type: 'image/jpeg', // MIME 타입 (예: 'image/jpeg', 'image/png')
          name: 'file.jpg', // 서버에 업로드할 때 사용할 파일 이름
        };
        formData.append('file', file);
        console.log('파일 추가됨:', file);
      }

      // 중간 목표 필터링
      const achievementRecordInfo: achieveRecordData = {
        bucketId: bucketAchieveInfo.bucketId,
        stickerId: bucketAchieveInfo.stickerId,
        achieveDate: bucketAchieveInfo.achieveDate,
        goalReview: bucketAchieveInfo.goalReview,
      };
      formData.append(
        'achieveBucketDTO',
        JSON.stringify(achievementRecordInfo), // JSON 데이터로 변환
      );
      console.log('전송할 FormData:', formData);
      try {
        // 목표 달성 기록 API 호출
        await achieveRecord(formData);
        Alert.alert('성공', '목표를 달성하였습니다.');
        navigation.navigate('MyBucket', {screen: 'MyBucketList'});
      } catch (error: any) {
        console.error('목표 달성 기록 오류:', error);
        const errorMessage =
          error.response?.data?.message ||
          '목표 달성 기록 중 오류가 발생했습니다.';
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
      setBucketAchieveInfo(prevData => ({
        ...prevData,
        bucketId: bucketId, // bucketId 설정
      }));
    } else {
      console.error('bucketId is undefined'); // 디버그용 에러 로그
    }
  }, [bucketId]);

  return (
  <View style={{ flex: 1, backgroundColor: '#FBFBFB' }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleUploadImage}>
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
   </View>
  );
};

export default AchievementRecordScreen;
