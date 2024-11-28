import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    marginTop: 10,
    marginHorizontal: 15, // 좌우 마진 조정
    flex: 1, // 전체 화면 공간 활용
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: '90%', // 화면에 맞게 크기 조정
    aspectRatio: 3 / 1, // 이미지 박스 비율 유지
    backgroundColor: '#ececec',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
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

export default styles;
