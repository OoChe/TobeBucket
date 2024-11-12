import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const MyBucketInfoScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior='automatic'
      >
        <View
          style={{
            width: 389.345,
            height: 692,
            position: 'relative',
            marginTop: 0,
            marginRight: 'auto',
            marginBottom: 0,
            marginLeft: 'auto',
          }}
        >
          <View
            style={{
              display: 'flex',
              width: 72,
              height: 21,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              zIndex: 39,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 3.345,
            }}
          >
            <View
              style={{
                width: 21,
                height: 21,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                zIndex: 39,
              }}
            >
              <Image source='../'>
            </View>
            <Text
              style={{
                height: 14,
                flexShrink: 0,
                fontFamily: 'Inter',
                fontSize: 9,
                fontWeight: '500',
                lineHeight: 14,
                color: '#878787',
                position: 'relative',
                textAlign: 'left',
                zIndex: 17,
              }}
              numberOfLines={1}
            >
              뒤로가기
            </Text>
          </View>
          <View
            style={{
              width: 349,
              height: 49,
              position: 'relative',
              zIndex: 45,
              marginTop: 12,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 19.345,
            }}
          >
            <ImageBackground
              style={{
                width: '14.04%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: '85.1%',
                zIndex: 38,
              }}
              source={require('./assets/images/612a264c-c452-4647-9a78-7703eed4a33d.png')}
            />
            <Text
              style={{
                display: 'flex',
                height: '63.27%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: 'Inter',
                fontSize: 28,
                fontWeight: '700',
                lineHeight: 31,
                color: '#3f6262',
                position: 'absolute',
                top: '6.12%',
                left: 0,
                textAlign: 'left',
                zIndex: 13,
              }}
              numberOfLines={1}
            >
              제주도 두 달 살이
            </Text>
            <ImageBackground
              style={{
                width: '13.47%',
                height: '65.31%',
                fontFamily: 'Pretendard Variable',
                fontSize: 39,
                fontWeight: '400',
                lineHeight: 12,
                position: 'absolute',
                top: '16.33%',
                left: '86.53%',
                zIndex: 45,
              }}
              source={require('./assets/images/89f2511d-cd66-4f4e-b1ca-0af9609a88de.png')}
            />
          </View>
          <Text
            style={{
              display: 'flex',
              width: 273,
              height: 31,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              fontFamily: 'Inter',
              fontSize: 13,
              fontWeight: '500',
              lineHeight: 15.733,
              color: '#878787',
              position: 'relative',
              textAlign: 'left',
              zIndex: 16,
              marginTop: -9,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 19.345,
            }}
          >
            생성일 - 2024.01.30. (일)
          </Text>
          <View
            style={{
              width: 354,
              height: 31,
              position: 'relative',
              zIndex: 18,
              marginTop: 6,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 16.345,
            }}
          >
            <Text
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: 'Inter',
                fontSize: 28,
                fontWeight: '700',
                lineHeight: 31,
                position: 'absolute',
                top: 0,
                left: 0,
                textAlign: 'left',
                zIndex: 14,
              }}
              numberOfLines={1}
            >
              D-0000
            </Text>
            <View
              style={{
                width: '6.78%',
                height: '77.42%',
                position: 'absolute',
                top: '9.68%',
                left: '93.22%',
                overflow: 'hidden',
                zIndex: 18,
              }}
            >
              <ImageBackground
                style={{
                  width: 3.42,
                  height: 17.5,
                  position: 'relative',
                  zIndex: 19,
                  marginTop: 3.25,
                  marginRight: 0,
                  marginBottom: 0,
                  marginLeft: 10.29,
                }}
                source={require('./assets/images/9903db19-add1-4cab-9933-d2472e1adafa.png')}
              />
            </View>
            <Text
              style={{
                display: 'flex',
                height: '64.52%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 16.943,
                color: '#1e6969',
                position: 'absolute',
                top: '35.48%',
                left: '33.05%',
                textAlign: 'left',
                zIndex: 15,
              }}
              numberOfLines={1}
            >
              2024.1.08 목표
            </Text>
          </View>
          <Text
            style={{
              height: 21,
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 21,
              color: '#000000',
              position: 'relative',
              textAlign: 'left',
              zIndex: 23,
              marginTop: 11,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 20.345,
            }}
            numberOfLines={1}
          >
            세부 설명
          </Text>
          <View
            style={{
              width: 363,
              height: 67,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              position: 'relative',
              zIndex: 22,
              marginTop: 4,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 12.345,
            }}
          >
            <Text
              style={{
                display: 'flex',
                width: 322,
                height: '76.12%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: 'Pretendard Variable',
                fontSize: 13,
                fontWeight: '400',
                lineHeight: 12,
                color: '#000000',
                position: 'absolute',
                top: '13.43%',
                left: '3.86%',
                textAlign: 'left',
                zIndex: 22,
              }}
            >
              제주도에서 한달 동안 살며 힐링하기
            </Text>
          </View>
          <Text
            style={{
              height: 31,
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 21.784,
              color: '#000000',
              position: 'relative',
              textAlign: 'left',
              zIndex: 26,
              marginTop: 6,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 20.345,
            }}
            numberOfLines={1}
          >
            카테고리
          </Text>
          <View
            style={{
              width: 363,
              height: 64,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              position: 'relative',
              zIndex: 34,
              marginTop: 227,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 12.345,
            }}
          >
            <Text
              style={{
                display: 'flex',
                height: '48.44%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                fontFamily: 'Inter',
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 21.784,
                color: '#000000',
                position: 'absolute',
                top: '12.5%',
                left: '3.86%',
                textAlign: 'left',
                zIndex: 36,
              }}
              numberOfLines={1}
            >
              구체적인 지역 찾아보기
            </Text>
            <ImageBackground
              style={{
                width: '13.5%',
                height: '76.56%',
                position: 'absolute',
                top: '12.5%',
                left: '82.09%',
                zIndex: 35,
              }}
              source={require('./assets/images/cc15d4f9-8d4f-4a70-a582-8af3404c1109.png')}
            />
            <Text
              style={{
                display: 'flex',
                width: 262.386,
                height: '48.44%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.943,
                color: '#000000',
                position: 'absolute',
                top: '43.75%',
                left: '3.86%',
                textAlign: 'left',
                zIndex: 37,
              }}
            >
              2024.08.30
            </Text>
          </View>
          <Text
            style={{
              height: 31,
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 21.784,
              color: '#000000',
              position: 'relative',
              textAlign: 'left',
              zIndex: 27,
              marginTop: 8,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 20.345,
            }}
            numberOfLines={1}
          >
            달성 후기
          </Text>
          <View
            style={{
              width: 363,
              height: 70,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              position: 'relative',
              zIndex: 12,
              marginTop: 1,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 12.345,
            }}
          >
            <Text
              style={{
                display: 'flex',
                width: 334,
                height: '82.86%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: 'Pretendard Variable',
                fontSize: 13,
                fontWeight: '400',
                lineHeight: 15,
                color: '#000000',
                position: 'absolute',
                top: '17.14%',
                left: '3.86%',
                textAlign: 'left',
                zIndex: 12,
              }}
            >
              제주도에서 한달 동안 힐링하기 성공했다!!! 제주도에서 다양한 연령의
              사람들을 만나고 나에 대해 고민해본 시간이었다. 제주도에서 힐링한
              만큼 현실에서도 화이팅해봐야지ㅎㅎ
            </Text>
          </View>
          <ImageBackground
            style={{
              width: '100%',
              height: '85.84%',
              position: 'absolute',
              top: '14.16%',
              left: 0,
            }}
            source={require('./assets/images/21296a3f-5b15-4368-a3a7-719cd08741ae.png')}
          />
          <View
            style={{
              width: '96.32%',
              height: '33.67%',
              position: 'absolute',
              top: '40.75%',
              left: '3.17%',
              zIndex: 41,
            }}
          >
            <ImageBackground
              style={{
                width: '1.2%',
                height: '102.15%',
                position: 'absolute',
                top: '-1.07%',
                left: '99.33%',
                zIndex: 41,
              }}
              source={require('./assets/images/be2472b8-5f6e-470f-8862-fb6bd402c401.png')}
            />
            <View
              style={{
                width: '96.8%',
                height: '27.47%',
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                position: 'absolute',
                top: '65.67%',
                left: 0,
                zIndex: 29,
              }}
            >
              <Text
                style={{
                  display: 'flex',
                  height: '48.44%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 21.784,
                  color: '#000000',
                  position: 'absolute',
                  top: '12.5%',
                  left: '3.86%',
                  textAlign: 'left',
                  zIndex: 31,
                }}
                numberOfLines={1}
              >
                필요한 돈 모으기
              </Text>
              <ImageBackground
                style={{
                  width: '13.5%',
                  height: '76.56%',
                  position: 'absolute',
                  top: '12.5%',
                  left: '82.09%',
                  zIndex: 30,
                }}
                source={require('./assets/images/34122f14-3279-4218-ab89-728c0d76236d.png')}
              />
              <ImageBackground
                style={{
                  width: '12.95%',
                  height: '50%',
                  fontFamily: 'Pretendard Variable',
                  fontSize: 39,
                  fontWeight: '400',
                  lineHeight: 12,
                  position: 'absolute',
                  top: '26.56%',
                  left: '83.75%',
                  zIndex: 46,
                }}
                source={require('./assets/images/419cbe52-d6fa-41d2-ba56-f086396ce3bd.png')}
              />
              <Text
                style={{
                  display: 'flex',
                  width: 262.386,
                  height: '48.44%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 16.943,
                  color: '#000000',
                  position: 'absolute',
                  top: '43.75%',
                  left: '3.86%',
                  textAlign: 'left',
                  zIndex: 32,
                }}
              >
                2024.05.30
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              width: '26.37%',
              height: '3.9%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffe296',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderWidth: 1,
              borderColor: '#ffe295',
              borderStyle: 'solid',
              position: 'absolute',
              top: '40.75%',
              left: '5.23%',
              zIndex: 44,
            }}
          >
            <Text
              style={{
                display: 'flex',
                width: 101.558,
                height: 27,
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                fontFamily: 'Pretendard',
                fontSize: 14,
                fontWeight: '700',
                lineHeight: 27,
                color: '#000000',
                position: 'relative',
                textAlign: 'center',
                zIndex: 44,
              }}
            >
              ✈️ 여행
            </Text>
          </View>
          <Text
            style={{
              display: 'flex',
              height: '4.48%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 21.784,
              color: '#000000',
              position: 'absolute',
              top: '47.25%',
              left: '5.23%',
              textAlign: 'left',
              zIndex: 25,
            }}
            numberOfLines={1}
          >
            함께하는 친구
          </Text>
          <View
            style={{
              display: 'flex',
              width: '52.91%',
              height: '2.89%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              top: '51.73%',
              left: '5.23%',
              zIndex: 8,
            }}
          >
            <View
              style={{
                width: 60,
                height: 20,
                flexShrink: 0,
                backgroundColor: '#fafafa',
                borderTopLeftRadius: 5.556,
                borderTopRightRadius: 5.556,
                borderBottomRightRadius: 5.556,
                borderBottomLeftRadius: 5.556,
                borderWidth: 1.111,
                borderColor: '#3f6262',
                borderStyle: 'solid',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  display: 'flex',
                  width: '82.3%',
                  height: '88.89%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  fontFamily: 'Pretendard Variable',
                  fontSize: 13.333332061767578,
                  fontWeight: '500',
                  lineHeight: 15.911,
                  color: '#000000',
                  position: 'absolute',
                  top: '5%',
                  left: '6.67%',
                  textAlign: 'center',
                  zIndex: 3,
                }}
                numberOfLines={1}
              >
                @햄햄이
              </Text>
            </View>
            <View
              style={{
                width: 62,
                height: 20,
                flexShrink: 0,
                backgroundColor: '#fafafa',
                borderTopLeftRadius: 5.556,
                borderTopRightRadius: 5.556,
                borderBottomRightRadius: 5.556,
                borderBottomLeftRadius: 5.556,
                borderWidth: 1.111,
                borderColor: '#3f6262',
                borderStyle: 'solid',
                position: 'relative',
                zIndex: 5,
              }}
            >
              <Text
                style={{
                  display: 'flex',
                  width: '82.3%',
                  height: '88.89%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  fontFamily: 'Pretendard Variable',
                  fontSize: 13.333332061767578,
                  fontWeight: '500',
                  lineHeight: 15.911,
                  color: '#000000',
                  position: 'absolute',
                  top: '5%',
                  left: '8%',
                  textAlign: 'center',
                  zIndex: 6,
                }}
                numberOfLines={1}
              >
                @햄햄삼
              </Text>
            </View>
            <View
              style={{
                width: 62,
                height: 20,
                flexShrink: 0,
                backgroundColor: '#fafafa',
                borderTopLeftRadius: 5.556,
                borderTopRightRadius: 5.556,
                borderBottomRightRadius: 5.556,
                borderBottomLeftRadius: 5.556,
                borderWidth: 1.111,
                borderColor: '#3f6262',
                borderStyle: 'solid',
                position: 'relative',
                zIndex: 8,
              }}
            >
              <Text
                style={{
                  display: 'flex',
                  width: '82.3%',
                  height: '88.89%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  fontFamily: 'Pretendard Variable',
                  fontSize: 13.333332061767578,
                  fontWeight: '500',
                  lineHeight: 15.911,
                  color: '#000000',
                  position: 'absolute',
                  top: '5%',
                  left: '8%',
                  textAlign: 'center',
                  zIndex: 9,
                }}
                numberOfLines={1}
              >
                @햄햄오
              </Text>
            </View>
          </View>
          <Text
            style={{
              display: 'flex',
              height: '4.48%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 21.784,
              color: '#000000',
              position: 'absolute',
              top: '57.51%',
              left: '5.23%',
              textAlign: 'left',
              zIndex: 24,
            }}
            numberOfLines={1}
          >
            중간 목표
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBucketInfoScreen;