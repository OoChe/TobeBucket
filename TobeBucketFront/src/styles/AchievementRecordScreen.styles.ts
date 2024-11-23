import {StyleSheet} from 'react-native';

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

export default styles;
