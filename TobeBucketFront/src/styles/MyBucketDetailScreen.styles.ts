import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FBFBFB',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 20,
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#EDF7F2',
    paddingLeft: 15,
  },
  textContainer: {
    width: 363,
    minHeight: 60, // 기본 높이 설정
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'relative',
    paddingHorizontal: 4, // 텍스트 좌우 간격을 위해 추가
    paddingVertical: 1, // 텍스트 상하 간격을 위해 추가
    marginBottom: 10,
  },
  friendBox: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 1,
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
  noDataText: {
    top: 17,
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#707070',
    position: 'relative',
    textAlign: 'center',
  },
  friendText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
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
  imageContainer: {
    width: 330,
    height: 200,
    borderRadius: 10,
    position: 'relative',
    marginLeft: 12,
    marginTop: 5,
  },
});

export default styles;