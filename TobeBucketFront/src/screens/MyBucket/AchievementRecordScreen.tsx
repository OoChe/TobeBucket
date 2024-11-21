/* [ 버킷 달성 기록 화면 ]
추가할 사항들
1) 스티커 Horizational로 정렬해서 보여주기
    -> 그러려면 스티커 객체들을 일단 받아와야할 필요가 있음!
2) 달성 날짜 달력으로 선택하게 하기
3) 사진 첨부 클릭 시 사진 선택하도록 하기
4) 스티커나 날짜를 선택하지 않은 경우 '선택해야합니다' 안내문 표시
5) 알맞게 작성했다면, 데이터 보내주기
 */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PageSmallTitle from '../../components/PageSmallTitle';

const AchievementRecordScreen = ({bucketInfo, setBucketInfo, sendDataToDB}) => {
  const navigation = useNavigation();
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
        <Text style={styles.titleText}>버킷리스트 제목</Text>
        <Text style={styles.subText}>
          <Text style={{color: '#35BA71'}}>*</Text>
          <Text> 표시는 필수 입력 항목입니다.</Text>
        </Text>
        <View>
          <View
            style={styles.itemContainer}>
            <Text style={styles.subTitleText}>
              1. 스티커 선택하기(최대 1개)
              <Text style={{color: '#35BA71'}}>*</Text>
            </Text>
            <TouchableOpacity style={styles.stickerButton}>
              <Text style={styles.sticketText}>스티커 잠금해제</Text>
            </TouchableOpacity>
          </View>

          {/* 스티커 가로로 정렬 표시 */}
          <View style={styles.itemContainer}>
            <Text style={styles.subTitleText}>
              2. 달성 날짜
              <Text style={{color: '#35BA71'}}>&nbsp;*</Text>
            </Text>
            <View
              style={{
                width: 168,
                height: 29,
                backgroundColor: '#ffffff',
                borderRadius: 6,
                borderColor: '#e3e4e5',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  top: 5,
                  left: 5,
                  fontFamily: 'Inter',
                  fontSize: 13,
                  color: '#72777a',
                  textAlign: 'left',
                }}>
                날짜 선택
              </Text>
            </View>
          </View>
          <Text style={styles.subTitleText}>3. 사진 첨부</Text>
          <TouchableOpacity
            style={{
              width: 328,
              height: 109,
              backgroundColor: '#ececec',
              borderRadius: 10,
              position: 'relative',
              marginTop: 6,
              marginLeft: 15,
              marginBottom: 10,
            }}>
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
            <Text
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Pretendard Variable',
                fontSize: 12,
                color: '#72777a',
                position: 'relative',
                marginLeft: 142,
              }}>
              사진 선택
            </Text>
          </TouchableOpacity>
          <Text style={styles.subTitleText}>4. 후기글 작성하기</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="달성 후기 작성란"
            value={null}
            onChangeText={text =>
              setBucketInfo(prevData => ({...prevData, bucketContent: text}))
            }
            multiline={true}
          />
        </View>
        <View
          style={styles.saveButton}>
          <Text
            style={styles.saveText}>
            저장하기
          </Text>
        </View>
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
  stickerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3f6262',
    paddingHorizontal: 5,
  },
  input: {
    borderWidth: 1,
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
});
