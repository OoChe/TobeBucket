import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface bucketShortProps {
  title: string;
  description: string;
  date: Date;
}

export const MyBucketShort = ({title, description, date}: bucketShortProps) => {
  return (
    <SafeAreaView>
      <View
        style={{
          width: 346,
          height: 108,
          position: 'relative',
          margin: 'auto',
          marginBottom: '20',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 3,
          }}>
          <View
            style={{
              width: 241,
              height: 38.423,
              position: 'relative',
              zIndex: 8,
              marginTop: 10.385,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 16,
            }}>
            {/* 아이콘 */}
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          <Text
            style={{
              display: 'flex',
              width: 23,
              height: 10.385,
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Pretendard',
              fontSize: 10,
              fontWeight: '500',
              lineHeight: 10.385,
              color: '#000000',
              position: 'relative',
              textAlign: 'center',
              zIndex: 18,
              marginTop: -6.346,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 23,
            }}>
            여행
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: 286,
              position: 'relative',
              marginTop: 6.5,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 26,
            }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>수정하기</Text>-
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>삭제하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>달성 기록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bucketContainer:{

  },
  titleText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    position: 'absolute',
    top: '10%',
    left: '23%',
  },
  descriptionText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    position: 'absolute',
    top: '70%',
    left: '23%',
  },
  buttonText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 11,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginRight: 3,
    marginBottom: 3,
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
