import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import dots from '../../assets/icons/dots.png';
import CategoryButton from '../../components/CategoryButton';
import StickerEmpty from '../../components/StickerEmpty';
import MilestoneShort from '../../components/MilestoneShort';

const MyBucketInfoScreen = () => {
  const circle = (size: number) => {
    const styles = StyleSheet.create({
      container: {
        borderRadius: size / 2,
      },
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic">
        <View>
          {/* 뒤로 가는 컴포넌트 */}
          <View style={styles.titleContainer}>
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Pretendard-ExtraBold',
                  fontSize: 28,
                  color: '#3f6262',
                }}>
                제주도 두 달 살이
              </Text>
              <Text
                style={{
                  fontFamily: 'Pretendard-Light',
                  fontSize: 13,
                  color: '#878787',
                  marginBottom: 10
                }}>
                생성일 - 2024.01.30. (일)
              </Text>
            </View>
            <StickerEmpty />
          </View>
          {/* #edf7f2 */}
          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                marginTop: 12,
              }}>
              <Text
                style={{
                  fontFamily: 'Pretendard-ExtraBold',
                  fontSize: 28,
                  marginRight: 5,
                }}>
                D-0000
              </Text>
              <Text
                style={{
                  fontFamily: 'Pretendard-Bold',
                  fontSize: 14,
                  color: '#1e6969',
                  marginTop: 15,
                }}>
                2024.01.08 목표
              </Text>
              <TouchableOpacity>
              <Image source={dots} style={{marginLeft: 120, marginTop: 5}}/>
              </TouchableOpacity>
            </View>
            <Text style={styles.middleText}>세부 설명</Text>
            <View style={styles.textContainer}>
              <Text style={styles.normalText}>
                제주도에서 한달 동안 살며 힐링하기
              </Text>
            </View>
            <Text style={styles.middleText}>카테고리</Text>
            {/* <CategoryButton
              icon={bucketInfo.category.icon}
              label={bucketInfo.category.label}
              borderColor={bucketInfo.category.borderColor}
              onPress={() => handleCategorySelect(bucketInfo.category.id)}
              isSelected={false} // 선택된 경우 스타일 적용 bucketInfo.category === category.id
            /> */}
            <Text style={styles.middleText}>함께하는 친구</Text>
            {/* 함께 하는 친구 목록 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <View style={styles.friendBox}>
                <Text style={styles.friendText}>@햄햄이</Text>
              </View>
              <View style={styles.friendBox}>
                <Text style={styles.friendText}>@햄햄삼</Text>
              </View>
              <View style={styles.friendBox}>
                <Text style={styles.friendText}>@햄햄오오</Text>
              </View>
            </View>

            <Text style={styles.middleText}>중간 목표</Text>
            <View>
              <MilestoneShort
                text="필요한 돈 모으기"
                isSticker={false}
                onPress={null}
              />
              <MilestoneShort
                text="구체적인 지역 찾아보기"
                isSticker={false}
                onPress={null}
              />
            </View>
            <Text style={styles.middleText}>달성 후기</Text>
            <View style={styles.textContainer}>
              <Text style={styles.normalText}>
                제주도에서 한달 동안 힐링하기 성공했다!!! 제주도에서 다양한
                연령의 사람들을 만나고 나에 대해 고민해본 시간이었다. 제주도에서
                힐링한 만큼 현실에서도 화이팅해봐야지ㅎㅎ 내용이 너무 적은 것
                같아서 아무래도 조금 더 많이 올려보겠습니다. 스크롤이 잘
                되는지는 확인해봐야죠 그죠? 그런고로 교수님의 말씀을 적어보도록
                하겠습니다. 일본에서는 네트워크 자체가 부실하다보니까 땅 밑에
                있는 걸 올려놓을 수가 없는거야 일본은 주민등록번호가 없는거야.
                고유 아이디가 없는거지. 일본인은 맨날 들고 다녀 너덜너덜해지면
                재발급하는거야 게다가 양식이 또 다른거야, 우리나라랑 다르게
                지자체마다 다 다른거야
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBucketInfoScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 20
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#aaaaaa',
    paddingLeft: 15
  },
  textContainer: {
    width: 363,
    minHeight: 60, // 기본 높이 설정
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'relative',
    paddingHorizontal: 4, // 텍스트 좌우 간격을 위해 추가
    paddingVertical: 1, // 텍스트 상하 간격을 위해 추가
    marginBottom: 10
  },
  friendBox: {
    alignSelf: 'flex-start', // 텍스트 길이에 맞춰 가로 길이 조정
    paddingHorizontal: 8, // 텍스트 좌우 간격을 위해 추가
    paddingVertical: 1, // 텍스트 상하 간격을 위해 추가
    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3f6262',
    marginRight: 10,
  },
  middleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    position: 'relative',
    marginVertical: 5,
  },
  normalText: {
    display: 'flex',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    padding: 5,
  },
  friendText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
});
